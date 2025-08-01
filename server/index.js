const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routers = require("./src/routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const { handleConfirmWebhookUrl } = require("./src/services/PayOsService");
const redisClient = require("./src/utils/redis");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000", // sửa lại đúng port frontend
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());

routers(app);
mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(async () => {
    console.log("Kết nối MongoDB thành công");
    const ngrok = await require("@ngrok/ngrok");
    const listener = await ngrok.forward({
      addr: 3001,
      authtoken: process.env.NGROK_AUTH_ENV,
    });
    const webhook = `${listener.url()}/api/orders/payos/webhook`;
    await handleConfirmWebhookUrl(webhook);
  })
  .catch((err) => {
    console.error("Lỗi kết nối MongoDB:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
