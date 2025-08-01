const dotenv = require("dotenv");
dotenv.config();

let Redis;

if (process.env.USE_FAKE_REDIS === "true") {
  Redis = require("ioredis-mock");
  console.log("Đang sử dụng Redis giả lập (ioredis-mock)");
} else {
  Redis = require("ioredis");
  console.log("Đang sử dụng Redis thật (ioredis)");
}

const redisClient =
  process.env.USE_FAKE_REDIS === "true"
    ? new Redis()
    : new Redis({
        host: "127.0.0.1",
        port: 6379,
      });

redisClient.on("ready", () => {
  console.log("Redis đã sẵn sàng (event: ready)");
});

redisClient.on("error", (err) => {
  console.error("Redis gặp lỗi:", err);
});

module.exports = redisClient;
