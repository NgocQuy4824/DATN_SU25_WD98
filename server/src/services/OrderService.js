const customResponse = require("../helpers/customResponse");

const createOrder = async (req, res, next) => {
  return customResponse({
    data: null,
    message: "Tạo đơn hàng thành công",
    status: 201,
    success: true,
  });
};

module.exports = {
  createOrder,
};
