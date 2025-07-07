const User = require("../models/UserModel");
const UserService = require("../services/UsersService");
const asyncHandler = require("../helpers/asyncHandler");

//  Lấy toàn bộ người dùng
const getAllUsers = async (req, res) => {
  try {
    const response = await UserService.getAllUsers();
    return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
  } catch (error) {
    console.error("getAllUsers error:", error);
    res.status(500).json({ status: "ERROR", message: "Lỗi server" });
  }
};

//  Lấy thông tin profile người dùng
const getProfile = asyncHandler(async (req, res) => {
  const response = await UserService.getProfile(req.userId);
  return res.status(response.status).json(response);
});

//  Cập nhật thông tin người dùng (gồm avatar nếu có)
const updateProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.userId;
    const avatarUrl = req.file?.path || null; // lấy URL từ Cloudinary nếu upload
    const { name, phone, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ status: "ERROR", message: "Thiếu thông tin bắt buộc" });
    }

    const response = await UserService.updateProfile(userId, { name, phone, email }, avatarUrl);
    return res.status(response.status).json(response);
  } catch (error) {
    console.error("updateProfile error:", error);
    res.status(500).json({ status: "ERROR", message: "Cập nhật thất bại" });
  }
});

//  Đổi mật khẩu
const changePassword = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { password, newPassword } = req.body;

  const response = await UserService.changePassword(userId, password, newPassword);
  return res.status(response.status).json(response);
});

//  Quên mật khẩu
const forgotPassword = async (req, res) => {
  try {
    const userId = req.body.userId || req.query.userId;
    const { password } = req.body;

    const response = await UserService.forgotPassword(userId, password);
    return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
  } catch (error) {
    console.error("forgotPassword error:", error);
    res.status(500).json({ status: "ERROR", message: "Lỗi server" });
  }
};

module.exports = {
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
};
