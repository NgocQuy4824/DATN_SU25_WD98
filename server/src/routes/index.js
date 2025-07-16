const AuthRouter = require("./AuthRouter");
const UsersRouter = require("./UsersRouter");
const ProductRouter = require("./ProductRouter");
const TypeProductRouter = require("./TypeProductRouter");
const SizeRouter = require("./SizeRouter");
const CartRouter = require("./CartRouter");
const ShippingRouter = require("./ShippingRouter");
const routers = (app) => {
  app.use("/api/auth", AuthRouter);
  app.use("/api/user", UsersRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/type-product", TypeProductRouter);
  app.use("/api/size", SizeRouter);
  app.use("/api/cart", CartRouter);
  app.use("/api/shipping", ShippingRouter);
};

module.exports = routers;
