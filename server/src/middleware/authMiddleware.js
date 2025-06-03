const jwt = require("jsonwebtoken");
import User from "./../../../client/src/pages/Admin/_Users/User";
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
  const token = req.headers.token.split("")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, User) {
    if (err) {
      return res.status(404).json({
        message: "The authemtication",
        status: "Error",
      });
    }
    const { payload } = User;
    if (payload?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "The authemtication",
        status: "Error",
      });
    }
  });
};

const authUserMiddleWare = (req, res, next) => {
  const token = req.headers.token.split("")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, User) {
    if (err) {
      return res.status(404).json({
        message: "The authemtication",
        status: "Error",
      });
    }
    const { payload } = User;
    if (payload?.isAdmin || payload?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "The authemtication",
        status: "Error",
      });
    }
  });
};

module.exports = {
  authMiddleWare,
  authUserMiddleWare,
};
