const AuthService = require("../services/AuthService");
const {
  registerSchema,
  loginSchema,
} = require("../validations/authValidations");

const validateInput = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    return {
      valid: false,
      message: error.details.map((e) => e.message),
    };
  }
  return { valid: true, value };
};

const register = async (req, res) => {
  try {
    const { valid, value, message } = validateInput(registerSchema, req.body);
    if (!valid) return res.status(400).json({ status: "ERROR", message });

    const response = await AuthService.register(value);
    return res.status(response.status === "ERROR" ? 400 : 200).json(response);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "ERROR", message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { valid, value, message } = validateInput(loginSchema, req.body);
    if (!valid) return res.status(400).json({ status: "ERROR", message });

    const response = await AuthService.login(value);
    return res.status(response.status === "ERROR" ? 400 : 200).json(response);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "ERROR", message: "Internal Server Error" });
  }
};

module.exports = { register, login };
