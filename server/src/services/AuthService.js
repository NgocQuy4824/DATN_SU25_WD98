const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { status: "ERROR", message: "Email đã tồn tại" };
  }

  const user = new User({ name, email, password });
  await user.save();

  const payload = { userId: user._id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const { password: _, ...userData } = user.toObject();

  return {
    status: "OK",
    message: "Đăng ký thành công",
    data: { accessToken, refreshToken, user: userData },
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { status: "ERROR", message: "Tài khoản không tồn tại" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { status: "ERROR", message: "Mật khẩu không đúng" };
  }

  const payload = { userId: user._id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const { password: _, ...userData } = user.toObject();

  return {
    status: "OK",
    message: "Đăng nhập thành công",
    data: { accessToken, refreshToken, user: userData },
  };
};

module.exports = { register, login };
