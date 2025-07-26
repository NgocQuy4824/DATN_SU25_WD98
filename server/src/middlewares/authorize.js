const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.role || !allowedRoles.includes(req.role)) {
      return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
    }
    next();
  };
};

module.exports = authorize;
