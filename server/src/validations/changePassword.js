const Joi = require("joi");

const changePasswordSchema = Joi.object({
  password: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập mật khẩu hiện tại",
  }),

  newPassword: Joi.string().min(6).required().messages({
    "string.empty": "Vui lòng nhập mật khẩu mới",
    "string.min": "Mật khẩu mới phải có ít nhất 6 ký tự",
  }),

  confirmPassword: Joi.string().required().valid(Joi.ref('newPassword')).messages({
    "any.only": "Xác nhận mật khẩu không khớp với mật khẩu mới",
    "string.empty": "Vui lòng xác nhận mật khẩu mới",
  }),
});

module.exports = changePasswordSchema;
