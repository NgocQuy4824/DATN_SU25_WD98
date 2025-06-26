const jwt = require("jsonwebtoken");

const generateToken = (payload, expiresIn = "1h") => {
  const secret = process.env.JWT_SECRET || "default_secret";
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET || "default_secret";
  return jwt.verify(token, secret);
};

module.exports = {
  generateToken,
  verifyToken,
};
