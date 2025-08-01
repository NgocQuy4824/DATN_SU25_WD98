const PayOS = require("@payos/node");
const dotenv = require("dotenv");

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);
function generateOrderCode() {
  const now = Date.now(); // milliseconds
  const random = Math.floor(Math.random() * 1000); // 0–999
  const orderCode = Number(`${now}${random.toString().padStart(3, "0")}`);
  if (orderCode > Number.MAX_SAFE_INTEGER) {
    return Number(String(orderCode).slice(0, 15));
  }
  return orderCode;
}

module.exports = {
  payos,
  generateOrderCode,
};
