const User = require("../models/UserModel");
const asyncHandler = require("../helpers/asyncHandler");
const UserService = require("../services/UsersService");

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

const changePassword = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { password, newPassword } = req.body;

  const response = await UserService.changePassword(
    userId,
    password,
    newPassword
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

// @PATCH /api/users/profile
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const file = req.files?.avatar || [];
  const body = req.body;

  const response = await UserService.updateProfile(userId, body, file);
  return res.status(response.status).json(response);
});

module.exports = {
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
};
