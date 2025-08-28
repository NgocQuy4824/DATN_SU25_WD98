const ROLE = require("../constants/role");
const STATUS = require("../constants/status");
const customResponse = require("../helpers/customResponse");
const Cart = require("../models/CartModel");
const MyVoucher = require("../models/MyVoucher");
const Order = require("../models/OrderModel");
const Product = require("../models/ProductsModel");
const { generateOrderCode, payos } = require("../utils/payos");
const redisClient = require("../utils/redis");

const createPaymentLink = async (req, res, next) => {
  const { body, user } = req;
  const userId = req.userId;
  const now = Math.floor(Date.now() / 1000);
  const expiredAt = now + 300;

  try {
    for (const item of body.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return customResponse({
          success: false,
          status: 404,
          message: `Không tìm thấy sản phẩm`,
        });
      }

      const variant = product.variants.find(
        (v) => v._id.toString() === item.variantId
      );
      if (!variant) {
        return customResponse({
          success: false,
          status: 404,
          message: `Không tìm thấy biến thể sản phẩm`,
        });
      }
      if (variant.countInStock < 1) {
        return customResponse({
          success: false,
          status: 400,
          message: `Sản phẩm ${product.name} - ${variant.color} đã hết hàng`,
        });
      }
      const redisUserKey = `stock_lock:${item.variantId}:${userId}`;
      const existingLocked = parseInt(await redisClient.get(redisUserKey)) || 0;
      if (existingLocked >= item.quantity) {
        continue;
      }
      const redisKeysPattern = `stock_lock:${item.variantId}:*`;
      const keys = await redisClient.keys(redisKeysPattern);
      const totalLocked = await Promise.all(
        keys.map(async (key) => parseInt(await redisClient.get(key)) || 0)
      );
      const total = totalLocked.reduce((sum, n) => sum + n, 0);

      const available = variant.countInStock - total;

      const needToLock = item.quantity - existingLocked;

      if (available < needToLock) {
        return customResponse({
          data: null,
          success: false,
          status: 400,
          message: `Biến thể ${variant.color} - ${product.name} không đủ hàng. Còn lại: ${available}`,
        });
      }
      await redisClient.set(
        redisUserKey,
        existingLocked + needToLock,
        "EX",
        300
      );
    }
    const orderCode = generateOrderCode();
    const redisOrderKey = `order_temp:${orderCode}`;
    await redisClient.set(
      redisOrderKey,
      JSON.stringify({
        ...req.body,
        userId,
      }),
      "EX",
      300
    );
    const payload = {
      orderCode: orderCode,
      amount: body.totalPrice,
      description: "Thanh toán đơn hàng",
      items: body.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      cancelUrl: "http://localhost:3000/order/cancel",
      returnUrl: `http://localhost:3000/order/success/${orderCode}`,
      expiredAt,
    };

    const paymentLinkRes = await payos.createPaymentLink(payload);

    return customResponse({
      data: paymentLinkRes,
      success: true,
      status: 200,
      message: "Thành công",
    });
  } catch (err) {
    console.error("❌ Lỗi tạo link thanh toán:", err);
    return res.status(500).json({ message: "Vui lòng chọn phương thức thanh toán khác" });
  }
};

const handleConfirmWebhookUrl = async (url) => {
  await payos.confirmWebhook(url);
};

const handleWebhookPayos = async (req, res, next) => {
  const webhookData = payos.verifyPaymentWebhookData(req.body);
  if (webhookData.orderCode !== 123 && webhookData.code === "00") {
    const cachedOrder = await redisClient.get(
      `order_temp:${webhookData.orderCode}`
    );
    const parsedOrder = JSON.parse(cachedOrder);
    for (const item of parsedOrder.items) {
      const { productId, variantId, quantity } = item;

      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Không tìm thấy sản phẩm");
      }
      if (!product.isActive) {
        throw new Error(`Sản phẩm ${product.name} đã ngừng bán`);
      }
      const variant = product.variants.id(variantId);
      if (!variant) {
        throw new Error("Không tìm thấy biến thể");
      }

      if (variant.countInStock < quantity) {
        throw new Error(
          `Sản phẩm ${product.name} (${variant.color}) không đủ hàng. Còn lại: ${variant.countInStock}`
        );
      }

      variant.countInStock -= quantity;
      await product.save();
      const keys = await redisClient.keys("stock_lock:*");
      if (keys.length > 0) {
        await redisClient.del(...keys);
        console.log(`🧹 Đã xoá ${keys.length} key Redis cache stock_lock`);
      } else {
        console.log("✅ Không có key stock_lock nào trong Redis");
      }
    }
    const { userId } = parsedOrder;
    await Promise.all(
      parsedOrder.items.map(async (item) => {
        await Cart.updateOne(
          { userId },
          {
            $pull: {
              items: {
                product: item.productId,
                variant: item.variantId,
              },
            },
          }
        );
      })
    );
    const orderLogCreate = {
      status: STATUS.PENDING,
      updateDate: new Date(),
      description: `${parsedOrder.customerInfo.name} đã đặt một đơn hàng mới`,
      updateBy: {
        name: "PACERUN",
        role: ROLE.SYSTEM,
      },
    };
    const newOrder = await Order.create({
      ...parsedOrder,
      status: STATUS.PENDING,
      isPaid: true,
      paymentMethod: "ONLINE",
      orderLog: [orderLogCreate],
    });

    // if (parsedOrder.voucherId) {
    //   await MyVoucher.updateOne(
    //     { userId: parsedOrder.userId, voucherId: parsedOrder.voucherId },
    //     { $set: { isUsed: true, usedAt: new Date() } }
    //   );
    //   console.log(`🎫 Voucher ${parsedOrder.voucherId} đã được sử dụng bởi user ${parsedOrder.userId}`);
    // }

    return customResponse({
      data: newOrder,
      success: true,
      message: "OK",
      status: 200,
    });
  }
  return customResponse({
    data: null,
    success: true,
    message: "OK",
    status: 200,
  });
};

module.exports = {
  createPaymentLink,
  handleConfirmWebhookUrl,
  handleWebhookPayos,
};
