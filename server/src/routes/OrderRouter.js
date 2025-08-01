const express = require("express");
const router = express.Router();
const orderController = require("../controller/OrderController");
const authenticate = require("../middlewares/authenticate");
const payOsRouter = require("./PayOsRouter");

router.get("/my-orders", authenticate, orderController.getMyOrder);
router.get(
  "/my-orders/detail/:id",
  authenticate,
  orderController.getMyDetailOrder
);
router.get("/all", orderController.getAllOrder);
router.get("/detail/:id", authenticate, orderController.getDetailOrder);
router.post("/create", authenticate, orderController.createOrder);
router.patch(
  "/update/:orderId",
  authenticate,
  orderController.updateStatusOrder
);
router.patch("/complete/:orderId", authenticate, orderController.completeOrder);
router.patch("/cancel/:orderId", authenticate, orderController.cancelOrder);
router.use("/payos", payOsRouter);
module.exports = router;
