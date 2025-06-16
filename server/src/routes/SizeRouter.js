const express = require("express");
const router = express.Router();
const SizeController = require("../controller/SizeController");

router.get("/", SizeController.getAllSizes);
router.get("/:id", SizeController.getSizeDetail);
router.post("/", SizeController.createSize);
router.patch("/:id", SizeController.updateSize);
router.delete("/:id", SizeController.deleteSize);


module.exports = router;