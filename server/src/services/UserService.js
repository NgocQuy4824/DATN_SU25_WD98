const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (userData) => {
  const { name, email, password, phone, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      status: "ERROR",
      message: "Email đã tồn tại",
    };
  }

  // Hash password trước khi lưu
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    role,
  });

  const savedUser = await newUser.save();

  // Không trả về password ra client
  const userToReturn = savedUser.toObject();
  delete userToReturn.password;

  return {
    status: "OK",
    message: "Đăng ký thành công",
    data: userToReturn,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return {
      status: "ERROR",
      message: "Email hoặc mật khẩu không đúng",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      status: "ERROR",
      message: "Email hoặc mật khẩu không đúng",
    };
  }

  // Tạo access token (thay đổi secret cho phù hợp)
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET || "your_jwt_secret",
    {
      expiresIn: "1d",
    }
  );

  const userToReturn = user.toObject();
  delete userToReturn.password;

  return {
    status: "OK",
    message: "Đăng nhập thành công",
    data: { ...userToReturn, token },
  };
};

module.exports = {
  createUser,
  loginUser,
};
