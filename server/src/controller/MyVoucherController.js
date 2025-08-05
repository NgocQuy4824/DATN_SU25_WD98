const MyVoucherService = require("../services/MyVoucherService");

const claimVoucher = async (req, res) => {
  try {
    const response = await MyVoucherService.claimVoucher(req);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi claimVoucher:", error);
    return res.status(500).json({
      status: "ERROR",
      message: "Lỗi server khi nhận voucher",
      data: null,
    });
  }
};

const getUserVouchers = async (req, res) => {
  try {
    const response = await MyVoucherService.getUserVouchers(req);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi getUserVouchers:", error);
    return res.status(500).json({
      status: "ERROR",
      message: "Lỗi server khi lấy danh sách voucher",
      data: null,
    });
  }
};

const updateVoucherQuantity = async (req, res) => {
  try {
    const response = await MyVoucherService.updateVoucherQuantity(req);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi updateVoucherQuantity:", error);
    return res.status(500).json({
      status: "ERROR",
      message: "Lỗi server khi cập nhật số lượng voucher",
      data: null,
    });
  }
};

module.exports = {
  claimVoucher,
  getUserVouchers,
  updateVoucherQuantity,
};
