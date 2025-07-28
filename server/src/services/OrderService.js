const { default: mongoose } = require("mongoose");
const customResponse = require("../helpers/customResponse");
const Order = require("../models/OrderModel");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductsModel");
const buildQueryOptions = require("../helpers/buildQueryOptions");
const STATUS = require("../constants/status");

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

        if (variant.countInStock < quantity) {
          throw new Error(
            `Sản phẩm ${product.name} (${variant.color}) không đủ hàng. Còn lại: ${variant.countInStock}`
          );
        }

        variant.countInStock -= quantity;
        await product.save({ session });
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
      const newOrder = await Order.create([{ ...req.body, userId }], {
        session,
      });
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
  foundOrder.status = req.body.status;
  if (!foundOrder.isPaid && req.body.status === STATUS.DELIVERED) {
    foundOrder.isPaid = true;
  }
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
  foundOrder.canceled = {
    isCancel: true,
    by: req.body.role,
    description: req.body.description,
  };
  foundOrder.status = STATUS.CANCELLED;
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
