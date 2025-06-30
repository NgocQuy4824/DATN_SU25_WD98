const express = require("express");
const router = express.Router();
const UsersController = require("../controller/UsersController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

// Lấy danh sách tất cả người dùng
router.get("/all", UsersController.getAllUsers);

// Lấy thông tin profile người dùng
// router.get("/profile", authenticate, UsersController.getProfile);

// Cập nhật thông tin người dùng
// router.patch("/profile", UsersController.updateProfile);

// Đổi mật khẩu
router.patch("/change-password", UsersController.changePassword);

// Quên mật khẩu
router.patch("/forgot-password", UsersController.forgotPassword);

// Cập nhật thông tin người dùng với upload avatar
router.patch(
  "/profile",
  authenticate,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  UsersController.updateProfile
);

module.exports = router;
