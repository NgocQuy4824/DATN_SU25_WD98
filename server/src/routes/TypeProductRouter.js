const express = require("express");
const router = express.Router();
const ProductTypeController = require("../controller/TypeProductController");

router.post("/create", ProductTypeController.createTypeProduct);
router.put("/update/:id", ProductTypeController.updateTypeProduct);

module.exports = router;
