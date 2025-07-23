const express = require("express");
const router = express.Router();
const orderController = require("../controller/OrderController");
const authenticate = require("../middlewares/authenticate");
router.get("/my-orders", authenticate, (req, res) => {
  return res.status(200).json("hehe");
});
router.get("/all", orderController.getAllOrder);
router.post("/create", authenticate, orderController.createOrder);
module.exports = router;
