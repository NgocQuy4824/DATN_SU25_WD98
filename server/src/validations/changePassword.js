const Joi = require("joi");

const changePasswordSchema = Joi.object({
  password: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập mật khẩu hiện tại",
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.empty": "Vui lòng nhập mật khẩu mới",
    "string.min": "Mật khẩu mới phải có ít nhất 6 ký tự",
  }),
});

module.exports = changePasswordSchema;
