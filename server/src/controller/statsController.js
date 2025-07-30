const asyncHandler = require("../helpers/asyncHandler");
const {
  getDashboardStats,
  findTop5Buyers,
  getProductStatsService,
  orderByDateRangeStats,
  totalStats,
  orderByYearStats,
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

const getOrderByYearRangeStats = asyncHandler(async (req, res, next) => {
  const response = await orderByYearStats(req, res, next);
  return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
});

const getProductStats = asyncHandler(async (req, res, next) => {
  const response = await getProductStatsService(req, res, next);
  return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
});

const getTop5Buyers = asyncHandler(async (req, res, next) => {
  const response = await findTop5Buyers(req, res, next);
  return res.status(response?.status === "ERROR" ? 400 : 200).json(response);
});

module.exports = {
  getTotalStats,
  getPendingTask,
  getOrderByDateRangeStats,
  getProductStats,
  getTop5Buyers,
  getOrderByYearRangeStats,
};
