const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const authorsize = require("../middlewares/authorize");
const {
  getTotalStats,
  getTop5Buyers,
  getPendingTask,
  getOrderByDateRangeStats,
  getProductStats
  
} = require("../controller/statsController");


const router = Router();

router.get("/total", authenticate, authorsize("admin"), getTotalStats);
router.get("/pending-task", authenticate, authorsize("admin"), getPendingTask);
router.get(
  "/dateRange",
  authenticate,
  authorsize("admin"),
  getOrderByDateRangeStats
);
router.get(
  "/productStats",
  authenticate,
  authorsize("admin"),
  getProductStats
);
router.get("/topBuyers", authenticate, authorsize("admin"), getTop5Buyers);

module.exports = router;
