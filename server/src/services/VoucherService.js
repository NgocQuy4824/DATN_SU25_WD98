const MyVoucher = require('../models/MyVoucher');
const Voucher = require('../models/VoucherModel');
const mongoose = require('mongoose');

// 1. Tạo voucher
const createVoucher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await Voucher.findOne({ code: data.code });
      if (isExist) {
        return resolve({
          status: "ERROR",
          message: "Mã voucher đã tồn tại",
        });
      }

      const voucher = await Voucher.create(data);
      resolve({
        status: "OK",
        message: "Tạo voucher thành công",
        data: voucher,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// 2. Lấy tất cả voucher
const getAllVoucher = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const vouchers = await Voucher.find().populate('applicableCategories');
      if (vouchers.length > 0) {
        resolve({
          status: "OK",
          message: "Lấy danh sách voucher thành công",
          data: vouchers,
        });
      } else {
        resolve({
          status: "ERROR",
          message: "Không có voucher nào",
          data: [],
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// 3. Lấy chi tiết voucher
const getDetailVoucher = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const voucher = await Voucher.findById(id).populate('applicableCategories');
      if (voucher) {
        resolve({
          status: "OK",
          message: "Lấy chi tiết voucher thành công",
          data: voucher,
        });
      } else {
        resolve({
          status: "ERROR",
          message: "Voucher không tồn tại",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// 4. Cập nhật voucher
const updateVoucher = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updated = await Voucher.findByIdAndUpdate(id, data, { new: true });
      if (updated) {
        resolve({
          status: "OK",
          message: "Cập nhật voucher thành công",
          data: updated,
        });
      } else {
        resolve({
          status: "ERROR",
          message: "Không tìm thấy voucher để cập nhật",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// 5. Xoá voucher
const deleteVoucher = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleted = await Voucher.findByIdAndDelete(id);
      if (deleted) {
        await MyVoucher.deleteMany({ voucherId: id });
        resolve({
          status: "OK",
          message: "Xoá voucher thành công",
        });
      } else {
        resolve({
          status: "ERROR",
          message: "Không tìm thấy voucher để xoá",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const generateVouchers = ({ prefix = 'SALE', count = 100, discountType, discountValue, minOrderValue = 0, startDate, endDate, applicableCategories = [] }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const vouchers = [];

      for (let i = 0; i < count; i++) {
        const randomCode = `${prefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}${i}`;
        vouchers.push({
          code: randomCode,
          description: `Auto-generated voucher ${i + 1}`,
          createdBy: 'system',
          discountType,
          discountValue,
          minOrderValue,
          applicableCategories,
          startDate,
          endDate,
          quantity: 1,
          status: 'active',
        });
      }

      const created = await Voucher.insertMany(vouchers);

      resolve({
        status: 'OK',
        message: `Tạo ${created.length} voucher thành công`,
        data: created,
      });
    } catch (error) {
      reject(error);
    }
  });
};


module.exports = {
  createVoucher,
  getAllVoucher,
  getDetailVoucher,
  updateVoucher,
  deleteVoucher,
  generateVouchers,
};
