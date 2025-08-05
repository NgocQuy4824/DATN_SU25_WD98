const VoucherService = require('../services/VoucherService');

// 1. Tạo voucher
const createVoucher = async (req, res) => {
  try {
    const response = await VoucherService.createVoucher(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi createVoucher:", error);
    return res.status(500).json({ status: "ERROR", message: "Lỗi server khi tạo voucher" });
  }
};

// 2. Lấy tất cả voucher
const getAllVoucher = async (req, res) => {
  try {
    const response = await VoucherService.getAllVoucher();
    if (response.status === "ERROR") {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi getAllVoucher:", error);
    return res.status(500).json({ status: "ERROR", message: "Lỗi server khi lấy danh sách voucher" });
  }
};

// 3. Lấy chi tiết 1 voucher
const getDetailVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await VoucherService.getDetailVoucher(id);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi getDetailVoucher:", error);
    return res.status(500).json({ status: "ERROR", message: "Lỗi server khi lấy chi tiết voucher" });
  }
};

// 4. Cập nhật voucher
const updateVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await VoucherService.updateVoucher(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi updateVoucher:", error);
    return res.status(500).json({ status: "ERROR", message: "Lỗi server khi cập nhật voucher" });
  }
};

// 5. Xoá voucher
const deleteVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await VoucherService.deleteVoucher(id);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi deleteVoucher:", error);
    return res.status(500).json({ status: "ERROR", message: "Lỗi server khi xoá voucher" });
  }
};
// 6. Tạo hàng loạt voucher
const generateVouchers = async (req, res) => {
  try {
    const response = await VoucherService.generateVouchers(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi generateVouchers:", error);
    return res.status(500).json({ status: "ERROR", message: "Lỗi server khi tạo hàng loạt voucher" });
  }
};


module.exports = {
  createVoucher,
  getAllVoucher,
  getDetailVoucher,
  updateVoucher,
  deleteVoucher,
  generateVouchers,
};
