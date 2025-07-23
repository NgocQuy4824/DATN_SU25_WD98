// const bcrypt = require("bcrypt");

const { register, login } = require("../services/AuthService");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const User = require("../models/UserModel");
const buildQueryOptions = require("../helpers/buildQueryOptions");

const testCustomQuery = async (req, res) => {
  try {
    console.log(req.query);
    const { filter, options } = buildQueryOptions(req.query);
    const { search, searchField } = req.query;
    const orders = await User.paginate(filter, options);

    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const registerController = async (req, res) => {
  try {
    const result = await register(req.body);

    if (result.status === "OK") {
      res.cookie("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    res.status(result.status === "OK" ? 201 : 400).json(result);
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      message: "Đăng ký thất bại",
      error: err.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const result = await login(req.body);

    if (result.status === "OK") {
      res.cookie("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    res.status(result.status === "OK" ? 200 : 400).json(result);
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      message: "Đăng nhập thất bại",
      error: err.message,
    });
  }
};

const refreshTokenController = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({
      status: "ERROR",
      message: "Không có refresh token",
    });
  }

  try {
    const decoded = verifyRefreshToken(token);
    const accessToken = generateAccessToken({
      userId: decoded.userId,
      role: decoded.role,
    });

    res.json({
      status: "OK",
      message: "Làm mới token thành công",
      data: { accessToken },
    });
  } catch (err) {
    res.status(403).json({
      status: "ERROR",
      message: "Refresh token không hợp lệ hoặc hết hạn",
    });
  }
};

const logoutController = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ status: "OK", message: "Đăng xuất thành công" });
};

module.exports = {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
  testCustomQuery,
};
