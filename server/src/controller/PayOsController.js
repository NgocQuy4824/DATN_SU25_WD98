const payosServices = require("../services/PayOsService");

const createPaymentLink = async (req, res, next) => {
  try {
    const result = await payosServices.createPaymentLink(req, res, next);
    return res.status(result.status || 200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "ERROR", message: "Lỗi server" });
  }
};
const handleWebhook = async (req, res, next) => {
  try {
    const result = await payosServices.handleWebhookPayos(req, res, next);
    return res.status(result.status || 200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "ERROR", message: "Lỗi server" });
  }
};

module.exports = {
  createPaymentLink,
  handleWebhook,
};
