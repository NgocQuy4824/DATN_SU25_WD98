const express = require("express");
const router = express.Router();
const AuthController = require("../controller/AuthController");

router.post("/register", AuthController.registerController);
router.post("/login", AuthController.loginController);
router.post("/refresh-token", AuthController.refreshTokenController);
router.post("/logout", AuthController.loginController);

module.exports = router;
