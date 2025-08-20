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
const axios = require("axios");
const { applyVoucherToOrder } = require("./MyVoucherService");

const createOrder = async (req, res, next,) => {
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
          name: "PACERUN",
          role: ROLE.SYSTEM,
        },
      };
      const newOrder = await Order.create(
        [{ ...req.body, userId, orderLog: [orderLogCreate] }],
        {
          session,
        }
      );

      if (req.body.voucherId) {
        const voucherResult = await applyVoucherToOrder(userId, req.body.voucherId);
        if (!voucherResult.success) {
          throw new Error(voucherResult.message);
        }
      }
      
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
  const user = await User.findById(req.userId)
  foundOrder.status = "done";
    foundOrder.orderLog.unshift({
    status: STATUS.DONE,
    updateDate: new Date(),
    description: `Đơn hàng đã được giao thành công`,
    updateBy: {
      name: user.name,
      role: req.body.role,
    },
  });
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

  for (const item of foundOrder.items) {
    const product = await Product.findById(item.productId);
    if (product) {
      const variant = product.variants.id(item.variantId);
      if (variant) {
        variant.countInStock += item.quantity;
        await product.save();
      }
    }
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
    status: foundOrder.isPaid ? STATUS.PENDINGCANCELLED : STATUS.CANCELLED,
    updateDate: new Date(),
    description: `${
      foundOrder.isPaid
        ? `Đơn hàng đã bị huỷ đang chờ hoàn tiền - Lý do: ${req.body.description}`
        : `Đơn hàng đã bị huỷ`
    }`,
    updateBy: {
      name: user.name,
      role: req.body.role,
    },
  });
  foundOrder.status = foundOrder.isPaid
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

// REFUND
const getAllBankInfo = async (req, res, next) => {
  const { data } = await axios.get(`https://api.vietqr.io/v2/banks`);
  const response = data.data
    .map((item) => ({
      _id: item.id,
      name: item.name,
      shortName: item.shortName,
      logo: item.logo,
    }))
    .sort((a, b) => a.shortName.localeCompare(b.shortName));

  return customResponse({
    message: "OK",
    status: 200,
    success: true,
    data: response,
  });
};

const updateRefundInfo = async (req, res, next) => {
  const { id } = req.params;
  const foundOrder = await Order.findById(id);
  if (!foundOrder) {
    return res.status(400).json(
      customResponse({
        status: 400,
        success: false,
        message: `Không tìm thấy đơn hàng với id là: ${id}`,
        data: null,
      })
    );
  }
  const countUpdateRefund = foundOrder.orderLog.filter(
    (item) => item.status === "updateRefund"
  );
  if (countUpdateRefund.length >= 4) {
    return res.status(400).json(
      customResponse({
        status: 400,
        success: false,
        message: "Bạn đã vượt quá số lượt cập nhật thông tin",
        data: null,
      })
    );
  }
  const user = await User.findById(req.userId);
  foundOrder.refund = {
    amount: foundOrder.totalPrice,
    ...req.body,
  };
  foundOrder.orderLog.unshift({
    status: "updateRefund",
    updateDate: new Date(),
    description: `Đơn hàng đã được cập nhật thông tin hoàn tiền: ${req.body.bankName.match(
      /^[^-]+/
    )} - ${req.body.accountNumber} - ${req.body.accountName}`,
    updateBy: {
      name: user.name,
      role: req.body.role,
    },
  });
  await foundOrder.save();
  return customResponse({
    data: foundOrder,
    message: `Cập nhật thông tin hoàn tiền thành công`,
    success: true,
    status: 200,
  });
};

const confirmRefund = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.userId;
  const foundOrder = await Order.findById(id);
  if (!foundOrder) {
    return res.status(400).json(
      customResponse({
        data: null,
        success: false,
        status: 400,
        message: "Not found order",
      })
    );
  }
  const file = req.file;
  foundOrder.refund = {
    ...foundOrder.refund,
    isCompleted: true,
    imageConfirm: file.path,
    reportInfo: req.body.reportInfo,
  };
  const user = await User.findById(userId);
  foundOrder.status = STATUS.CONFIRMREFUND;
  foundOrder.orderLog.unshift({
    status: STATUS.CONFIRMREFUND,
    updateDate: new Date(),
    description: req.body.description
      ? req.body.description
      : `Đơn hàng đã được hoàn tiền`,
    updateBy: {
      name: user.name,
      role: ROLE.ADMIN,
    },
  });
  await foundOrder.save();
  return customResponse({
    data: foundOrder,
    message: "Cập nhật hoàn tiền thành công",
    status: 200,
    success: true,
  });
};
const cancelRefund = async (req, res, next) => {
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
    isCancel: true,
    by: ROLE.ADMIN,
    description: `Từ chối hoàn tiền vì ${req.body.description} có thắc mắc vui lòng liên hệ: ${req.body.reportInfo}`,
  };
  foundOrder.orderLog.unshift({
    status: STATUS.CANCELLED,
    updateDate: new Date(),
    description: `Từ chối hoàn tiền vì ${req.body.description} có thắc mắc vui lòng liên hệ: ${req.body.reportInfo}`,
    updateBy: {
      name: user.name,
      role: req.body.role,
    },
  });
  foundOrder.refund = {
    ...foundOrder.refund,
    isCompleted: false,
    reportInfo: req.body.reportInfo,
  };
  foundOrder.status = STATUS.CANCELLED;
  await foundOrder.save();
  return customResponse({
    message: `Từ chối hoàn tiền`,
    status: 200,
    success: true,
    data: null,
  });
};
const endingRefund = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.userId;
  const foundOrder = await Order.findById(id);
  if (!foundOrder) {
    return res.status(400).json(
      customResponse({
        data: null,
        success: false,
        status: 400,
        message: "Not found order",
      })
    );
  }
  const user = await User.findById(userId);
  foundOrder.status = STATUS.CANCELLED;
  foundOrder.canceled = {
    isCancel: true,
    by: req.body.role,
    description: `Đơn hàng bị huỷ vì đã hoàn tiền thành công`,
  };
  foundOrder.orderLog.unshift({
    status: STATUS.CANCELLED,
    updateDate: new Date(),
    description: `${user.name} - Xác nhận đã nhận được tiền`,
    updateBy: {
      name: user.name,
      role: req.body.role,
    },
  });
  await foundOrder.save();
  return customResponse({
    data: foundOrder,
    message: "Cập nhật hoàn tiền thành công",
    status: 200,
    success: true,
  });
};

module.exports = {
  createOrder,
  getDetailOrder,
  getMyDetailOrder,
  getMyOrder,
  updateStatusOrder,
  confirmRefund,
  completeOrder,
  cancelOrder,
  getAllBankInfo,
  updateRefundInfo,
  cancelRefund,
  endingRefund,
};
