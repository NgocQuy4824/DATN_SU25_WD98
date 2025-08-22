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

 const orderByYearStats = async (req, res, next) => {
  const { year } = req.query;

  if (!year) {
    return { status: "ERROR", message: "Năm không được để trống!" };
  }

  const startDate = moment
    .tz(`01-01-${year}`, "DD-MM-YYYY", VIET_NAM_TZ)
    .startOf("year");
  const endDate = moment
    .tz(`31-12-${year}`, "DD-MM-YYYY", VIET_NAM_TZ)
    .endOf("year");

  const start = startDate.utc().toDate();
  const end = endDate.utc().toDate();

  const pipeline = [
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
        status: { $ne: STATUS.CANCELLED },
        isPaid: true,
      },
    },
    {
      $addFields: {
        createdAtVN: {
          $dateToString: {
            format: "%Y-%m-%d %H:%M:%S",
            date: "$createdAt",
            timezone: "+07:00",
          },
        },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: { $toDate: "$createdAtVN" } },
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
        month: "$_id.month",
        totalOrders: 1,
        totalRevenue: 1,
      },
    },
    {
      $sort: { month: 1 },
    },
  ];

  const data = await Order.aggregate(pipeline);

  const totalOrders = data.reduce((acc, curr) => acc + curr.totalOrders, 0);
  const totalRevenue = data.reduce((acc, curr) => acc + curr.totalRevenue, 0);

  return {
    status: "OK",
    message: "Lấy thống kê đơn hàng và doanh thu theo năm thành công",
    data: {
      year: parseInt(year),
      months: data,
      totalOrders,
      totalRevenue,
    },
  };
};

const getProductStatsService = async (req, res, next) => {
  const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        status: "ERROR",
        message: "Missing startDate or endDate parameter",
      });
    }

    const start = moment.tz(startDate, "DD-MM-YYYY", VIET_NAM_TZ).startOf("day").toDate();
    const end = moment.tz(endDate, "DD-MM-YYYY", VIET_NAM_TZ).endOf("day").toDate();

    if (!moment(start).isValid() || !moment(end).isValid() || moment(start).isAfter(end)) {
      return res.status(400).json({
        status: "ERROR",
        message: "Invalid date range",
      });
    }

    const pipeline = [
      //lọc đơn hàng hợp lệ , trạng thái done ,  đã thanh toán
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: STATUS.DONE,
          isPaid: true,
        },
        //tách đơn hàng lấy từng sp
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          name: { $first: "$items.name" },
          totalQuantity: { $sum: "$items.quantity" },
          //tính tổng doanh thu của từng sp
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
          image: { $first: "$items.image" },
          price: { $first: "$items.price" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          productTotalStock: {
            $ifNull: [{ $sum: "$productDetails.variants.countInStock" }, 0]
          },
        },
      },
      { $sort: { totalQuantity: -1 } },
    ];

    const [allProductStats, totalStock] = await Promise.all([
      Order.aggregate(pipeline),
      Product.aggregate([
        { $match: { isActive: true } },
        { $unwind: "$variants" },
        {
          $group: {
            _id: null,
            totalStock: { $sum: "$variants.countInStock" },
          },
        },
      ]),
    ]);

    const totalStockValue = totalStock[0]?.totalStock || 0;

    const formatProductStats = (products) =>
      products.map((product) => ({
        _id: product._id.toString(),
        name: product.name,
        totalQuantity: product.totalQuantity,
        totalRevenue: parseFloat(product.totalRevenue.toFixed(2)),
        image: product.image,
        price: product.price,
        percentageOfTotal: (
          (product.totalQuantity /
            (product.totalQuantity + (product.productTotalStock || 0))) *
          100
        ).toFixed(2),
        percentageOfAllProducts:
          totalStockValue > 0
            ? ((product.productTotalStock / totalStockValue) * 100).toFixed(2)
            : "0.00",
      }));

    // bán nhiều nhất 5 sp
    const topSellingWithPercentage = formatProductStats(allProductStats.slice(0, 5));
    //bán ít nhất
    const leastSellingWithPercentage = formatProductStats(
      allProductStats.slice(-5).reverse()
    );

  return {
    status: "OK",
    message: "Lấy thống kê sản phẩm bán chạy và bán chậm thành công",
    data: {
      topSellingProducts: topSellingWithPercentage,
      leastSellingProducts: leastSellingWithPercentage,
      dateRange: {
        start: moment(start).format("YYYY-MM-DD"),
        end: moment(end).format("YYYY-MM-DD"),
      },
    },
  };
};

const findTop5Buyers = async (req, res, next) => {
  const { dateFilter, startDate, endDate, month, year } = req.query;

  let start, end;

  if (dateFilter === "range" && startDate && endDate) {
    start = moment
      .tz(startDate, "DD-MM-YYYY", VIET_NAM_TZ)
      .startOf("day")
      .toDate();
    end = moment.tz(endDate, "DD-MM-YYYY", VIET_NAM_TZ).endOf("day").toDate();
  } else if (dateFilter === "monthly" && month && year) {
    start = moment
      .tz(`01-${month}-${year}`, "DD-MM-YYYY", VIET_NAM_TZ)
      .startOf("month")
      .toDate();
    end = moment
      .tz(`01-${month}-${year}`, "DD-MM-YYYY", VIET_NAM_TZ)
      .endOf("month")
      .toDate();
  } else if (dateFilter === "yearly" && year) {
    start = moment
      .tz(`01-01-${year}`, "DD-MM-YYYY", VIET_NAM_TZ)
      .startOf("year")
      .toDate();
    end = moment
      .tz(`31-12-${year}`, "DD-MM-YYYY", VIET_NAM_TZ)
      .endOf("year")
      .toDate();
  } else {
    return { status: "OK", message: "Tham số lọc ngày không hợp lệ" };
  }

  if (
    !moment(start).isValid() ||
    !moment(end).isValid() ||
    moment(start).isAfter(end)
  ) {
    return { status: "OK", message: "Khoảng thời gian không hợp lệ" };
  }

  // cách lấy top người dùng
  const topBuyersPipeline = [
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
        status: STATUS.DONE,
        isPaid: true,
      },
    },
    {
      $group: {
        _id: "$userId",
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$totalPrice" },
        totalItems: { $sum: { $sum: "$items.quantity" } },
        lastOrderDate: { $max: "$createdAt" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $project: {
        _id: 1,
        totalOrders: 1,
        totalSpent: 1,
        totalItems: 1,
        lastOrderDate: {
          $dateToString: {
            format: "%Y-%m-%d %H:%M:%S",
            date: "$lastOrderDate",
            timezone: VIET_NAM_TZ,
          },
        },
        name: "$userInfo.name",
        email: "$userInfo.email",
        phone: "$userInfo.phone",
        avatar: "$userInfo.avatar",
      },
    },
    { $sort: { totalSpent: -1 } },
    { $limit: 5 },
  ];

  const latestOrdersPipeline = [
    { $sort: { createdAt: -1 } },
    { $limit: 2 },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $project: {
        _id: 1,
        customerName: "$userInfo.name",
        customerAvatar: "$userInfo.avatar",
        paymentMethod: 1,
        totalPrice: 1,
        status: 1,
        createdAt: {
          $dateToString: {
            format: "%Y-%m-%d %H:%M:%S",
            date: "$createdAt",
            timezone: VIET_NAM_TZ,
          },
        },
      },
    },
  ];

  const [topBuyers, latestOrders] = await Promise.all([
    Order.aggregate(topBuyersPipeline),
    Order.aggregate(latestOrdersPipeline),
  ]);

  return {
    status: "OK",
    message: "Lấy danh sách người mua hàng nhiều nhất thành công",
    data: {
      topBuyers,
      latestOrders,
      dateRange: {
        start: moment(start).format("YYYY-MM-DD"),
        end: moment(end).format("YYYY-MM-DD"),
      },
    },
  };
};

module.exports = {
  totalStats,
  getDashboardStats,
  orderByDateRangeStats,
  getProductStatsService,
  findTop5Buyers,
  orderByYearStats
};
