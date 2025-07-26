const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const customResponse = require("../helpers/customResponse");

// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find().select("-password");
    return customResponse({
      success: true,
      message: "Lấy danh sách người dùng thành công",
      status: 200,
      data: users,
    });
  } catch (error) {
    console.error(error);
    return customResponse({
      success: false,
      message: "Lỗi khi lấy danh sách người dùng",
      status: 500,
    });
  }
};

// Get user profile
const getProfile = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password").lean();
    if (!user) {
      return customResponse({
        success: false,
        message: "Không tìm thấy người dùng",
        status: 404,
      });
    }
    return customResponse({
      success: true,
      message: "Lấy thông tin thành công",
      status: 200,
      data: user,
    });
  } catch (error) {
    console.error(error);
    return customResponse({
      success: false,
      message: "Lỗi máy chủ",
      status: 500,
    });
  }
};


const updateProfile = async (userId, data) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        success: false,
        message: "Không tìm thấy người dùng",
        status: 404,
      };
    }

    // Kiểm tra email đã tồn tại chưa
    if (data.email && data.email !== user.email) {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        return {
          success: false,
          message: "Email đã được sử dụng bởi người dùng khác",
          status: 400,
        };
      }
      user.email = data.email;
    }

    // Cập nhật các field khác
    const fieldsToUpdate = { ...data };
    delete fieldsToUpdate.email;
    user.set(fieldsToUpdate);

    await user.save();

    return {
      success: true,
      message: "Cập nhật thành công",
      data: user,
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Cập nhật thất bại",
      status: 500,
    };
  }
};


// Change password
const changePassword = async (userId, oldPassword, newPassword, confirmPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return customResponse({
        success: false,
        message: "Không tìm thấy người dùng",
        status: 404,
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return customResponse({
        success: false,
        message: "Mật khẩu cũ không chính xác",
        status: 400,
      });
    }

  
    if (newPassword !== confirmPassword) {
      return customResponse({
        success: false,
        message: "Mật khẩu mới và xác nhận mật khẩu không khớp",
        status: 400,
      });
    }


    user.password = newPassword;
    await user.save();

    return customResponse({
      success: true,
      message: "Đổi mật khẩu thành công",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return customResponse({
      success: false,
      message: "Lỗi máy chủ khi đổi mật khẩu",
      status: 500,
    });
  }
};


// Forgot password
const forgotPassword = async (userId, password) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return customResponse({
        success: false,
        message: "Không tìm thấy người dùng",
        status: 404,
      });
    }

    user.password = password;
    await user.save();

    return customResponse({
      success: true,
      message: "Khôi phục mật khẩu thành công",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return customResponse({
      success: false,
      message: "Khôi phục mật khẩu thất bại",
      status: 500,
    });
  }
};

module.exports = {
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
};
