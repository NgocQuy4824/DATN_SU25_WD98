const User = require("../models/UserModel");
const bcrypt = require('bcrypt');



// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find().select("-password");
    return {
      status: "OK",
      message: "Lấy danh sách người dùng thành công",
      data: users,
    };
  } catch (error) {
    console.error(error);
    return { status: "ERROR", message: "Lỗi khi lấy danh sách người dùng" };
  }
};

// Get user profile
const getProfile = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password").lean();
    return {
      status: "OK",
      message: "Lấy thông tin người dùng thành công",
      data: user,
    };
  } catch (error) {
    console.error(error);
    return { status: "ERROR", message: "Lỗi khi lấy thông tin người dùng" };
  }
};

// Update user profile (bỏ upload avatar)
const updateProfile = async (userId, data) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { status: "ERROR", message: "Không tìm thấy người dùng" };
    }

    user.set(data);
    await user.save();

    return {
      status: "OK",
      message: "Cập nhật thông tin thành công",
    };
  } catch (error) {
    console.error(error);
    return { status: "ERROR", message: "Cập nhật thông tin thất bại" };
  }
};

// Change password
const changePassword = async (userId, password, newPassword) => {
  try {
    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: "ERROR", message: "Mật khẩu cũ không chính xác" };
    }
    user.password = newPassword;
    await user.save();
    return { status: "OK", message: "Đổi mật khẩu thành công" };
  } catch (error) {
    console.error(error);
    return { status: "ERROR", message: "Đổi mật khẩu thất bại" };
  }
};

// Forgot password
const forgotPassword = async (userId, password) => {
  try {
    const user = await User.findById(userId);
    user.password = password;
    await user.save();
    return { status: "OK", message: "Khôi phục mật khẩu thành công" };
  } catch (error) {
    console.error(error);
    return { status: "ERROR", message: "Khôi phục mật khẩu thất bại" };
  }
};

module.exports = {
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
};
