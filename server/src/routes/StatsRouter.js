const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const authorsize = require("../middlewares/authorize");
const {
  getTotalStats,
  getPendingTask,
  getOrderByDateRangeStats,
  
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


module.exports = router;
