const AuthRouter = require("./AuthRouter");
const UsersRouter = require("./UsersRouter");
const ProductRouter = require("./ProductRouter");
const TypeProductRouter = require("./TypeProductRouter");
const SizeRouter = require("./SizeRouter");
const CartRouter = require("./CartRouter");
const ShippingRouter = require("./ShippingRouter");
const orderRouter = require("./OrderRouter");
const statsRouter = require("./StatsRouter");
const voucherRouter = require("./VoucherRouter");
const myVoucherRouter = require("./MyVoucherRouter");
const routers = (app) => {
  app.use("/api/auth", AuthRouter);
  app.use("/api/user", UsersRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/type-product", TypeProductRouter);
  app.use("/api/size", SizeRouter);
  app.use("/api/cart", CartRouter);
  app.use("/api/shipping", ShippingRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/stats", statsRouter);
  app.use("/api/vouchers", voucherRouter);
  app.use("/api/my-vouchers", myVoucherRouter);
};

module.exports = routers;
