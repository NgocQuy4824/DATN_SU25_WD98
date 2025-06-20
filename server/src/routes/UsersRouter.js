const express = require("express");
const router = express.Router();
const UsersController = require("../controller/UsersController");
const authenticate = require("../middlewares/authenticate");

// Lấy danh sách tất cả người dùng
router.get("/all", UsersController.getAllUsers);

// Lấy thông tin profile người dùng
router.get("/profile", authenticate, UsersController.getProfile);

// Cập nhật thông tin người dùng
router.patch("/profile", UsersController.updateProfile);

// Đổi mật khẩu
router.patch("/change-password", UsersController.changePassword);

// Quên mật khẩu
router.patch("/forgot-password", UsersController.forgotPassword);

module.exports = router;
