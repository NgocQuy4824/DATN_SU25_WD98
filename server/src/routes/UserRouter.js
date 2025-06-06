const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController.js");

router.post("/register", userController.createUser);

module.exports = router;
