const express = require("express");
const router = express.Router();

const UsersController = require("../controller/UsersController");
const authenticate = require("../middlewares/authenticate");
const uploadAvatar = require("../middlewares/uploadAvatar"); // đã gộp Cloudinary trong file này
const validate = require("../middlewares/validate");
const changePasswordSchema = require("../validations/changePassword");

//  Lấy danh sách tất cả người dùng (Admin use-case, không cần auth ở đây?)
router.get("/all", UsersController.getAllUsers);

//  Lấy thông tin hồ sơ người dùng
router.get("/profile", authenticate, UsersController.getProfile);

//  Cập nhật thông tin người dùng + avatar (dùng Multer + Cloudinary)
router.patch(
  "/update-profile",
  authenticate,
  uploadAvatar.single("avatar"),
  UsersController.updateProfile
);


//  Đổi mật khẩu
router.patch(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  UsersController.changePassword
);

//  Quên mật khẩu
router.patch("/forgot-password", UsersController.forgotPassword);

module.exports = router;
