const express = require("express");
const router = express.Router();
const shippingController = require("../controller/ShippingController");

router.get("/province", shippingController.getProvince);
router.get("/ward/:provinceId", shippingController.getWard);
module.exports = router;
