const UserService = require("../services/UserService");
const {
  registerSchema,
  loginSchema,
} = require("../validations/userValidations");

const registerUser = async (req, res) => {
  try {
    // kiểm tra dữ liệu đầu vào nếu có lôi sẽ trả về lỗi khi abortEarly là false
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      // Lấy tất cả message lỗi
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        status: "ERROR",
        message: errors,
      });
    }

    // Gọi service tạo user
    const response = await UserService.registerUser(value);

    if (response.status === "ERROR") {
      return res.status(400).json(response);
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
};


const loginUser = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        status: "ERROR",
        message: errors,
      });
    }

    const response = await UserService.loginUser(value);

    if (response.status === "ERROR") {
      return res.status(400).json(response);
    }

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
