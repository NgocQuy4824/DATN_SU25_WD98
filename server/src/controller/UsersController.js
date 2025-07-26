const User = require("../models/UserModel");
const UserService = require("../services/UsersService");
const asyncHandler = require("../helpers/asyncHandler");

// Lấy toàn bộ người dùng
const getAllUsers = async (req, res) => {
  try {
    const response = await UserService.getAllUsers();
    return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
  } catch (error) {
    console.log(error);
  }
};

// Lấy thông tin profile người dùng
const getProfile = asyncHandler(async (req, res) => {
  const response = await UserService.getProfile(req.userId);
  return res.status(response.status).json(response);
});

// Cập nhật thông tin người dùng (không xử lý files)
const updateProfile = asyncHandler(async (req, res) => {
  const response = await UserService.updateProfile(req.userId, req.body);
  return res.status(response.status).json(response);
});

// Đổi mật khẩu
const changePassword = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { password, newPassword, confirmPassword } = req.body;

  const response = await UserService.changePassword(
    userId,
    password,
    newPassword,
    confirmPassword
  );
  return res.status(response.status).json(response);
});

// Quên mật khẩu
const forgotPassword = async (req, res) => {
  try {
    const userId = req.body.userId || req.query.userId;
    const { password } = req.body;

    const response = await UserService.forgotPassword(userId, password);
    return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
};
