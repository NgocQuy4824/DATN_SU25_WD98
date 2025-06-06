const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  const { name, email, password, phone , role } = userData;

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
    role
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

module.exports = {
  createUser,
};
