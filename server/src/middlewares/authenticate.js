const { verifyAccessToken } = require("../utils/jwt");

const authenticate = (req, res, next) => {

    //lấy token từ headers 
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token không hợp lệ hoặc thiếu" });
    }
    //băm nhỏ token
    const token = authHeader.split(" ")[1];
    //giải mã token
    try {
        const decoded = verifyAccessToken(token);
        //gắn với userId và role tương ứng với token đó
        req.userId = decoded.userId;
        req.role = decoded.role;
        //token hợp lệ thì sang controller xử lý logic
        next();
    } catch (err) {
        const msg =
            err.name === "TokenExpiredError"
                ? "Token đã hết hạn"
                : "Token không hợp lệ";
        return res.status(401).json({ message: msg });
    }
};

module.exports = authenticate;
