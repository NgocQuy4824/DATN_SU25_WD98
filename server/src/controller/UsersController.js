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
const getProfile = async (req, res) => {
  try {
    const userId = req.body.userId || req.query.userId;
    const response = await UserService.getProfile(userId);
    return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
  } catch (error) {
    console.log(error);
  }
};

// Cập nhật thông tin người dùng (không xử lý files)
const updateProfile = async (req, res) => {
  try {
    const userId = req.body.userId || req.query.userId;
    const data = req.body;

    const response = await UserService.updateProfile(userId, data);
    return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
  } catch (error) {
    console.log(error);
  }
};

// Đổi mật khẩu
const changePassword = async (req, res) => {
  try {
    const userId = req.body.userId || req.query.userId;
    const { password, newPassword } = req.body;

    const response = await UserService.changePassword(userId, password, newPassword);
    return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
  } catch (error) {
    console.log(error);
  }
};

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
