const asyncHandler = require("../helpers/asyncHandler");
const {
  getDashboardStats,
  orderByDateRangeStats,
  totalStats,
} = require("../services/StatsService");

const getTotalStats = asyncHandler(async (req, res, next) => {
  const response = await totalStats(req, res, next);
  return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
});

const getPendingTask = asyncHandler(async (req, res, next) => {
  const response = await getDashboardStats(req, res, next);
  return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
});

const getOrderByDateRangeStats = asyncHandler(async (req, res, next) => {
  const response = await orderByDateRangeStats(req, res, next);
  return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
});


module.exports = {
  getTotalStats,
  getPendingTask,
  getOrderByDateRangeStats,
};
