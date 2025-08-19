const { Router } = require("express");
const router = Router();
const myVoucherController = require("../controller/MyVoucherController");
const authenticate = require("../middlewares/authenticate");


router.get("/all", authenticate, myVoucherController.getUserVouchers);

router.post("/claim", authenticate, myVoucherController.claimVoucher);

router.post("/update", authenticate, myVoucherController.updateVoucherQuantity);

router.post("/apply", authenticate, myVoucherController.applyVoucherToOrder);

module.exports = router;
