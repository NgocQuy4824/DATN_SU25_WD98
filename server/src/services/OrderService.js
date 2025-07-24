const { default: mongoose } = require("mongoose");
const customResponse = require("../helpers/customResponse");
const Order = require("../models/OrderModel");

const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userId = req.userId;
    if (!userId) {
      return resolve({
        status: "ERROR",
        message: "Sản phẩm không tồn tại",
      });
    }
    const newOrder = await Order.create(
      [
        {
          ...req.body,
          userId,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return customResponse({
      data: newOrder[0],
      message: "Tạo đơn hàng thành công",
      status: 201,
      success: true,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    return customResponse({
      data: null,
      message: "Có lỗi xảy ra khi tạo đơn hàng",
      status: 500,
      success: false,
    });
  }
};

module.exports = {
  createOrder,
};
