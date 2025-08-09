const { default: mongoose } = require("mongoose");
const customResponse = require("../helpers/customResponse");
const Order = require("../models/OrderModel");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductsModel");
const buildQueryOptions = require("../helpers/buildQueryOptions");
const STATUS = require("../constants/status");
const redisClient = require("../utils/redis");
const ROLE = require("../constants/role");
const User = require("../models/UserModel");

const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const userId = req.userId;
    if (!userId) {
      return customResponse({
        status: "ERROR",
        message: "Người dùng không hợp lệ",
      });
    }

    await session.withTransaction(async () => {
      const items = req.body.items || [];

      for (const item of items) {
        const { productId, variantId, quantity } = item;
        console.log("vao vong lap");
        const product = await Product.findById(productId).session(session);
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
        const redisUserKey = `stock_lock:${item.variantId}:${userId}`;
        const existingLocked =
          parseInt(await redisClient.get(redisUserKey)) || 0;
        const redisKeysPattern = `stock_lock:${item.variantId}:*`;
        const keys = await redisClient.keys(redisKeysPattern);
        const totalLocked = await Promise.all(
          keys.map(async (key) => parseInt(await redisClient.get(key)) || 0)
        );
        const total = totalLocked.reduce((sum, n) => sum + n, 0);

        const available = variant.countInStock - total;

        const needToLock = item.quantity - existingLocked;

        if (available < needToLock) {
          throw new Error(
            `Sản phẩm ${product.name} (${variant.color}) không đủ hàng. Còn lại: ${available}`
          );
        }
        if (variant.countInStock < quantity) {
          throw new Error(
            `Sản phẩm ${product.name} (${variant.color}) không đủ hàng. Còn lại: ${variant.countInStock}`
          );
        }
        console.log("tru stock");
        variant.countInStock -= quantity;
        await product.save({ session });
        if (keys.length > 0) {
          await redisClient.del(...keys);
          console.log(`Đã xoá ${keys.length} key Redis cache stock_lock`);
        } else {
          console.log("✅ Không có key stock_lock nào trong Redis");
        }
      }
      await Promise.all(
        items.map(async (item) => {
          await Cart.updateOne(
            { userId },
            {
              $pull: {
                items: {
                  product: item.productId,
                  variant: item.variantId,
                },
              },
            },
            { session }
          );
        })
      );
      const orderLogCreate = {
        status: STATUS.PENDING,
        updateDate: new Date(),
        description: `${req.body.customerInfo.name} đã đặt một đơn hàng mới`,
        updateBy: {
          name: "SPACERUN",
          role: ROLE.SYSTEM,
        },
      };
      const newOrder = await Order.create(
        [{ ...req.body, userId, orderLog: [orderLogCreate] }],
        {
          session,
        }
      );
      res.json(
        customResponse({
          data: newOrder[0],
          message: "Tạo đơn hàng thành công",
          status: 201,
          success: true,
        })
      );
    });
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    res.status(500).json(
      customResponse({
        data: null,
        message: error.message || "Có lỗi xảy ra khi tạo đơn hàng",
        status: 500,
        success: false,
      })
    );
  } finally {
    session.endSession();
  }
};

const getDetailOrder = async (req, res, next) => {
  const foundOrder = await Order.findOne({ _id: req.params.id });
  if (!foundOrder) {
    return customResponse({
      status: 400,
      message: `Không tìm thấy đơn hàng với mã ${req.params.id}`,
    });
  }
  return customResponse({
    data: foundOrder,
    message: "Success",
    status: 200,
    success: true,
  });
};

const getMyDetailOrder = async (req, res, next) => {
  const userId = req.userId;
  const foundOrder = await Order.findOne({ _id: req.params.id, userId });
  if (!foundOrder) {
    return customResponse({
      status: 400,
      message: `Không tìm thấy đơn hàng với mã ${req.params.id}`,
    });
  }
  return customResponse({
    data: foundOrder,
    message: "Success",
    status: 200,
    success: true,
  });
};

const getMyOrder = async (req, res, next) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json(
      customResponse({
        status: "ERROR",
        message: "Không tìm thấy userId",
      })
    );
  }

  const { filter, options } = buildQueryOptions(req.query);
  filter.userId = userId;
  try {
    const orders = await Order.paginate(filter, options);

    return res.status(200).json(
      customResponse({
        data: orders,
        message: "Lấy đơn hàng thành công",
        status: 200,
        success: true,
      })
    );
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    return res.status(500).json(
      customResponse({
        message: "Lỗi máy chủ khi lấy đơn hàng",
        status: 500,
        success: false,
        data: null,
      })
    );
  }
};

const updateStatusOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.userId;
  if (!orderId) {
    return res.status(400).json(
      customResponse({
        message: "Chưa có id của đơn hàng",
        status: 400,
        success: false,
      })
    );
  }
  const foundOrder = await Order.findOne({ _id: orderId });
  if (!foundOrder) {
    return res.status(400).json(
      customResponse({
        message: "Không tìm thấy đơn hàng",
        status: 400,
        success: false,
      })
    );
  }
  const user = await User.findById(userId);
  foundOrder.status = req.body.status;
  if (!foundOrder.isPaid && req.body.status === STATUS.DELIVERED) {
    foundOrder.isPaid = true;
  }
  foundOrder.orderLog.unshift({
    status: req.body.status,
    description: req.body.description,
    updateDate: new Date(),
    updateBy: {
      name: user.name,
      role: user.role,
    },
  });
  await foundOrder.save();
  return customResponse({
    message: `Cập nhật trạng thái đơn hàng thành công sang thành ${req.body.status}`,
    status: 200,
    success: true,
    data: null,
  });
};

const completeOrder = async (req, res, next) => {
  const { orderId } = req.params;
  if (!orderId) {
    return res.status(400).json(
      customResponse({
        message: "Chưa có id của đơn hàng",
        status: 400,
        success: false,
      })
    );
  }
  const foundOrder = await Order.findOne({ _id: orderId });
  if (!foundOrder) {
    return res.status(400).json(
      customResponse({
        message: "Không tìm thấy đơn hàng",
        status: 400,
        success: false,
      })
    );
  }
  foundOrder.status = "done";
  await foundOrder.save();
  return customResponse({
    message: `Hoàn thành đơn hàng`,
    status: 200,
    success: true,
    data: null,
  });
};

const cancelOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.userId;
  if (!orderId) {
    return res.status(400).json(
      customResponse({
        message: "Chưa có id của đơn hàng",
        status: 400,
        success: false,
      })
    );
  }
  const foundOrder = await Order.findOne({
    _id: orderId,
    "canceled.isCancel": false,
  });
  if (!foundOrder) {
    return res.status(400).json(
      customResponse({
        message: "Không tìm thấy đơn hàng",
        status: 400,
        success: false,
      })
    );
  }
  const user = await User.findById(userId);
  foundOrder.canceled = {
    isCancel: foundOrder.isPaid ? false : true,
    by: req.body.role,
    description: foundOrder.isPaid
      ? `${req.body.description} - Đang chờ hoàn tiền`
      : req.body.description,
  };
  foundOrder.orderLog.unshift({
    status:
      foundOrder.isPaid && req.body.description !== "Thanh toán thất bại"
        ? STATUS.PENDINGCANCELLED
        : STATUS.CANCELLED,
    updateDate: new Date(),
    description: `${
      foundOrder.isPaid && req.body.description !== "Thanh toán thất bại"
        ? `Đơn hàng đã bị huỷ đang chờ hoàn tiền`
        : `Đơn hàng đã bị huỷ`
    }`,
    updateBy: {
      name: user.name,
      role: req.body.role,
    },
  });
  foundOrder.status =
    foundOrder.isPaid && req.body.description !== "Thanh toán thất bại"
      ? STATUS.PENDINGCANCELLED
      : STATUS.CANCELLED;
  await foundOrder.save();
  return customResponse({
    message: `huỷ đơn hàng thành công`,
    status: 200,
    success: true,
    data: null,
  });
};

module.exports = {
  createOrder,
  getDetailOrder,
  getMyDetailOrder,
  getMyOrder,
  updateStatusOrder,
  completeOrder,
  cancelOrder,
};
