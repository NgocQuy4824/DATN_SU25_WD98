const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const { generateToken } = require("../utils/jwt");

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) return { status: "ERROR", message: "Email đã tồn tại" };

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return { status: "OK", message: "Đăng ký thành công", data: user };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return { status: "ERROR", message: "Tài khoản không tồn tại" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { status: "ERROR", message: "Mật khẩu không đúng" };

  //   Uncomment nếu cần xác minh email
  //   if (!user.isActive) return { status: "ERROR", message: "Tài khoản chưa được xác minh email" };

  const token = generateToken({ userId: user._id, role: user.role });

  return {
    status: "OK",
    message: "Đăng nhập thành công",
    data: { token, user },
  };
};

module.exports = { register, login };
