const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Voucher = require("../models/VoucherModel");
const MyVoucher = require("../models/MyVoucher");
const customResponse = require("../helpers/customResponse");
const User = require("../models/UserModel");

const validateVoucher = (voucher) => {
  if (!voucher) return "Không tìm thấy Voucher.";
  const now = new Date();
  if (voucher.status !== "active" || now < voucher.startDate || now > voucher.endDate) {
    return "Voucher không hợp lệ hoặc đã hết hạn.";
  }
  if (voucher.quantity <= 0) return "Voucher đã hết.";
  return null;
};

const claimVoucher = async (req) => {
  const userId = req.userId;
  const { voucherCode } = req.body;

  const voucher = await Voucher.findOne({ code: voucherCode });
  const validationError = validateVoucher(voucher);
  if (validationError) {
    return customResponse({
      data: null,
      message: validationError,
      status: StatusCodes.BAD_REQUEST,
      success: false,
    });
  }

  const existingClaim = await MyVoucher.findOne({ userId, voucherId: voucher._id });
  if (existingClaim) {
    return customResponse({
      data: null,
      message: "Bạn đã nhận Voucher này.",
      status: StatusCodes.CONFLICT,
      success: false,
    });
  }

  voucher.quantity -= 1;
  if (voucher.quantity === 0) voucher.status = "expired";
  await voucher.save();

  const myVoucher = await MyVoucher.create({
    userId,
    voucherId: voucher._id,
  });

  return customResponse({
    data: myVoucher,
    message: "Nhận voucher thành công",
    status: StatusCodes.OK,
    success: true,
  });
};


const getUserVouchers = async (req) => {
  const userId = req.userId;

  const myVouchers = await MyVoucher.find({
    userId,
    status: "active",
    quantity: { $gt: 0 },
  })
    .populate("voucherId")
    .exec();

  return customResponse({
    data: myVouchers,
    message: ReasonPhrases.OK,
    status: StatusCodes.OK,
    success: true,
  });
};

const updateVoucherQuantity = async (req) => {
  const userId = req.userId;
  const { myVoucherId, quantity } = req.body;

  const myVoucher = await MyVoucher.findOne({ userId, _id: myVoucherId });

  if (!myVoucher) {
    return customResponse({
      data: null,
      message: "Voucher này chưa được người dùng nhận.",
      status: StatusCodes.NOT_FOUND,
      success: false,
    });
  }

  if (myVoucher.quantity <= 0) {
    return customResponse({
      data: null,
      message: "Voucher đã hết hoặc không thể sử dụng nữa.",
      status: StatusCodes.BAD_REQUEST,
      success: false,
    });
  }

  myVoucher.quantity = quantity;
  await myVoucher.save();

  return customResponse({
    data: myVoucher,
    message: "Cập nhật số lượng thành công",
    status: StatusCodes.OK,
    success: true,
  });
};

const applyVoucherToOrder = async (userId, voucherId) => {
  const user = await User.findById(userId);

  if (user.usedVouchers.includes(voucherId)) {
    return {
      success: false,
      message: "Bạn đã sử dụng voucher này trước đó",
    };
  }

  // Logic giảm số lượng voucher hoặc mark voucher là used trong MyVoucher
  const myVoucher = await MyVoucher.findOne({ userId, voucherId });
  if (!myVoucher || myVoucher.quantity <= 0) {
    return {
      success: false,
      message: "Voucher không hợp lệ hoặc đã hết số lượng",
    };
  }

  // Giảm số lượng voucher
  myVoucher.quantity -= 1;
  if (myVoucher.quantity === 0) myVoucher.status = "used";
  await myVoucher.save();

  // Push voucher vào usedVouchers của user
  user.usedVouchers.push(voucherId);
  await user.save();

  return {
    success: true,
    message: "Voucher áp dụng thành công",
    data: myVoucher,
  };
};



module.exports = {
  claimVoucher,
  getUserVouchers,
  updateVoucherQuantity,
  applyVoucherToOrder,
};
