const express = require("express");
const router = express.Router();
const SizeController = require("../controller/SizeController");

router.post("/create", SizeController.createSize);


module.exports = router;    