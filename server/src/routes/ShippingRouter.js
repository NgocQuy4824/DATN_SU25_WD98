const express = require("express");
const router = express.Router();
const shippingController = require("../controller/ShippingController");

router.get("/province", shippingController.getProvince);
router.get("/district/:provinceId", shippingController.getDistrict);
router.get("/ward/:districtId", shippingController.getWard);
module.exports = router;
