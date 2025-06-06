const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "string.empty": "Tên không được để trống",
      "any.required": "Tên là trường bắt buộc",
    }),
  
  email: Joi.string()
    .email({ tlds: { allow: false } }) 
    .required()
    .messages({
      "string.email": "Email không hợp lệ",
      "string.empty": "Email không được để trống",
      "any.required": "Email là trường bắt buộc",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.empty": "Mật khẩu không được để trống",
      "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
      "any.required": "Mật khẩu là trường bắt buộc",
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Mật khẩu xác nhận không khớp",
      "string.empty": "Xác nhận mật khẩu không được để trống",
      "any.required": "Xác nhận mật khẩu là trường bắt buộc",
    }),

  phone: Joi.string()
    .required()
    .messages({
      "string.empty": "Số điện thoại không được để trống",
      "any.required": "Số điện thoại là trường bắt buộc",
    }),
});

module.exports = {
  registerSchema,
};
