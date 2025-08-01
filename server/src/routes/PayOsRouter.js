const express = require("express");
const payOsRouter = express.Router();
const payOsController = require("../controller/PayOsController");
const authenticate = require("../middlewares/authenticate");

payOsRouter.post("/create", authenticate, payOsController.createPaymentLink);
payOsRouter.post("/webhook", payOsController.handleWebhook);
module.exports = payOsRouter;
