const express = require("express");
const router = express.Router();
const SizeController = require("../controller/SizeController");

router.post("/create", SizeController.createSize);
router.put("/update/:id", SizeController.updateSize);
router.get("/", SizeController.getAllSizes);

module.exports = router;
