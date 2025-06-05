const User = require("../models/UserModel");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({ email });
      if (checkUser !== null) {
        resolve({
          status: "OK",
          message: "Email đã tồn tại",
        });
      } else {
        const createdUser = await User.create({
          name,
          email,
          password,
          confirmPassword,
          phone,
        });
        resolve({
          status: "OK",
          message: "Thành công",
          data: createdUser,
        });
      }
    } catch (error) {
      console.log("Lỗi khi tạo người dùng:", error);
      reject(error);
    }
  });
};

module.exports = {
  createUser,
};
