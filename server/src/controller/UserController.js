const UserService = require("../services/UserService.js");

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([-+.'])*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({
        status: "ERROR",
        message: "Bắt buộc nhập",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERROR",
        message: "Bắt buộc phải nhập email",
      });
    } else if (password !== confirmPassword) {
      return res.status(400).json({
        status: "ERROR",
        message: "Bắt buộc nhập trùng mật khẩu",
      });
    }

    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
};
