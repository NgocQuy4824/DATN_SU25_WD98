const Joi = require("joi");

const changePasswordSchema = Joi.object({
  password: Joi.string().required().min(6).label("Mật khẩu hiện tại").messages({
    "any.required": "{#label} không được bỏ trống",
    "string.min": "{#label} phải có ít nhất {#limit} ký tự",
  }),

  newPassword: Joi.string()
    .required()
    .min(6)
    .disallow(Joi.ref("password"))
    .label("Mật khẩu mới")
    .messages({
      "any.required": "{#label} không được bỏ trống",
      "string.min": "{#label} phải có ít nhất {#limit} ký tự",
      "any.invalid": "{#label} không được trùng với mật khẩu hiện tại",
    }),
});

module.exports = changePasswordSchema;
