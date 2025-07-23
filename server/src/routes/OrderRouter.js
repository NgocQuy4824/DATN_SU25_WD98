const express = require("express");
const router = express.Router();
const orderController = require("../controller/OrderController");
router.get("/my-orders", (req, res) => {
  return res.status(200).json("hehe");
});
router.get("/all", orderController.getAllOrder);
module.exports = router;
