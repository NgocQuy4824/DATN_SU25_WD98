const Order = require("../models/OrderModel");
const Product = require("../models/ProductsModel");
const User = require("../models/UserModel");
const moment = require("moment-timezone");
const STATUS = require("../constants/status");

const VIET_NAM_TZ = "Asia/Ho_Chi_Minh";

const totalStats = async (req, res, next) => {
  const { dateFilter, startDate, endDate, month, year } = req.query;

  let start, end;

  switch (dateFilter) {
    case "range":
      if (startDate && endDate) {
        start = moment
          .tz(startDate, "DD-MM-YYYY", VIET_NAM_TZ)
          .startOf("day")
          .toDate();
        end = moment
          .tz(endDate, "DD-MM-YYYY", VIET_NAM_TZ)
          .endOf("day")
          .toDate();
      }
      break;

    case "monthly":
      if (startDate && endDate) {
        start = moment
          .tz(`01-${month}-${year}`, "DD-MM-YYYY", VIET_NAM_TZ)
          .startOf("month")
          .toDate();
        end = moment
          .tz(`01-${month}-${year}`, "DD-MM-YYYY", VIET_NAM_TZ)
          .endOf("month")
          .toDate();
      }
      break;

    case "yearly":
      if (startDate && endDate) {
        start = moment
          .tz(`01-01-${year}`, "DD-MM-YYYY", VIET_NAM_TZ)
          .startOf("year")
          .toDate();
        end = moment
          .tz(`31-12-${year}`, "DD-MM-YYYY", VIET_NAM_TZ)
          .endOf("year")
          .toDate();
      }
      break;

    case "single":
      if (startDate && endDate) {
        start = moment
          .tz(startDate, "DD-MM-YYYY", VIET_NAM_TZ)
          .startOf("day")
          .toDate();
        end = moment
          .tz(startDate, "DD-MM-YYYY", VIET_NAM_TZ)
          .endOf("day")
          .toDate();
      }
      break;

    default:
      return { status: "ERROR", message: "Tham số lọc ngày không hợp lệ!" };
  }

  const [
    totalOrders,
    cancelledOrders,
    totalRevenueResult,
    newUsers,
    newProducts,
  ] = await Promise.all([
    Order.countDocuments({ createdAt: { $gte: start, $lte: end } }),
    Order.countDocuments({
      createdAt: { $gte: start, $lte: end },
      status: STATUS.CANCELLED,
    }),
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: STATUS.DONE,
          isPaid: true,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
          count: { $sum: 1 },
        },
      },
    ]).then((result) => ({
      total: result[0]?.total || 0,
      count: result[0]?.count || 0,
    })),
    User.countDocuments({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }),
    Product.countDocuments({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }),
  ]);

  const successfulOrders = totalRevenueResult.count;
  const orderSuccessRate =
    totalOrders > 0 ? (successfulOrders / totalOrders) * 100 : 0;
  const orderCancelRate =
    totalOrders > 0 ? (cancelledOrders / totalOrders) * 100 : 0;
  const daysDiff = moment(end).diff(moment(start), "days") + 1;
  const averageDailyRevenue = totalRevenueResult.total / daysDiff;

  return {
    status: "OK",
    message: "Lấy thống kê tổng đơn hàng thành công",
    data: {
      newUsers,
      newProducts,
      totalOrders,
      cancelledOrders,
      successfulOrders,
      totalRevenue: totalRevenueResult.total,
      orderSuccessRate: parseFloat(orderSuccessRate.toFixed(2)),
      orderCancelRate: parseFloat(orderCancelRate.toFixed(2)),
      averageDailyRevenue: parseFloat(averageDailyRevenue.toFixed(2)),
      dateRange: {
        start: moment(start).format("YYYY-MM-DD"),
        end: moment(end).format("YYYY-MM-DD"),
      },
    },
  };
};

const getDashboardStats = async (req, res, next) => {
  const [
    pendingOrders,
    confirmedOrders,
    shippingOrders,
    cancelledOrders,
    outOfStockProducts,
  ] = await Promise.all([
    Order.countDocuments({ status: STATUS.PENDING }),
    Order.countDocuments({ status: STATUS.CONFIRMED }),
    Order.countDocuments({ status: STATUS.SHIPPING }),
    Order.countDocuments({ status: STATUS.CANCELLED }),
    Product.aggregate([
      { $match: { isActive: false } },
      { $addFields: { totalStock: { $sum: "$variants.countInStock" } } },
      { $match: { totalStock: 0 } },
      { $count: "outOfStockCount" },
    ]).then((result) => result[0]?.outOfStockCount || 0),
  ]);

  return {
    status: "OK",
    message: "Lấy thống kê trạng thái đơn hàng và hàng tồn kho thành công",
    data: {
      pendingOrders,
      confirmedOrders,
      shippingOrders,
      cancelledOrders,
      outOfStockProducts,
    },
  };
};

const orderByDateRangeStats = async (req, res, next) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Ngày bắt đầu hoặc ngày kết thúc không được để trống" });
  }

  const start = moment
    .tz(startDate, "DD-MM-YYYY", VIET_NAM_TZ)
    .startOf("day")
    .utc()
    .toDate();
  const end = moment
    .tz(endDate, "DD-MM-YYYY", VIET_NAM_TZ)
    .endOf("day")
    .utc()
    .toDate();

  if (
    !moment(start).isValid() ||
    !moment(end).isValid() ||
    moment(start).isAfter(end)
  ) {
    return { status: "ERROR", message: "Khoảng thời gian không hợp lệ!" };
  }

  const pipeline = [
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
        status: { $ne: STATUS.CANCELLED },
        isPaid: true,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
            timezone: VIET_NAM_TZ,
          },
        },
        totalOrders: { $sum: 1 },
        totalRevenue: {
          $sum: {
            $cond: [{ $eq: ["$status", STATUS.DONE] }, "$totalPrice", 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        totalOrders: 1,
        totalRevenue: 1,
      },
    },
    { $sort: { date: 1 } },
  ];

  const data = await Order.aggregate(pipeline);

  console.log(data);

  const allDates = [];
  const currentDate = moment(start).tz(VIET_NAM_TZ);
  const lastDate = moment(end).tz(VIET_NAM_TZ);

  while (currentDate <= lastDate) {
    const dateString = currentDate.format("YYYY-MM-DD");
    const existingStat = data.find((s) => s.date === dateString) || {
      totalOrders: 0,
      totalRevenue: 0,
    };

    allDates.push({
      date: dateString,
      totalOrders: existingStat.totalOrders,
      totalRevenue: parseFloat(existingStat.totalRevenue.toFixed(2)),
    });

    currentDate.add(1, "days");
  }

  return {
    status: "OK",
    message: "Lấy thống kê đơn hàng theo khoảng thời gian thành công",
    data: allDates,
  };
};

module.exports = {
  totalStats,
  getDashboardStats,
  orderByDateRangeStats,
};
