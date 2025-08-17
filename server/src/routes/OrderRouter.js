const express = require("express");
const router = express.Router();
const orderController = require("../controller/OrderController");
const authenticate = require("../middlewares/authenticate");
const payOsRouter = require("./PayOsRouter");
const upload = require("../middlewares/upload");

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
router.get("/bank/all", orderController.getAllBankInfo);
router.patch(
  "/refund/update-info/:id",
  authenticate,
  orderController.updateRefundInfo
);
router.post(
  "/refund/confirm/:id",
  authenticate,
  upload.single("image"),
  orderController.confirmRefund
);
router.patch("/refund/cancel/:orderId", authenticate, orderController.cancelRefund);
router.patch("/refund/ending/:id", authenticate, orderController.endingRefund);
router.use("/payos", payOsRouter);
module.exports = router;
