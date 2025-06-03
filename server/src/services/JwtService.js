const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const gennerralAccessToken = (payload) => {
  console.log("payload", payload);
  const access_token = jwt.sign(
    {
      payload,
    },
    "process.env.ACCESS_TOKEN",
    { expiesIn: "30s" }
  );
  return access_token;
};

const gennerralRefreshToken = (payload) => {
  const refresh_token = jwt.sign(
    {
      payload,
    },
    "process.env.REFRESH_TOKEN",
    { expiesIn: "365d" }
  );
  return refresh_token;
};

const refreshTokenJwtSerice = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "Error",
            message: "The authemtication",
          });
        }
        const { payload } = user;
        const access_token = await gennerralAccessToken({
          id: payload?.id,
          isAdmin: payload?.isAdmin,
        });
        resolve({
          status: "OK",
          message: "Sucess",
          access_token,
        });
      });
    } catch (error) {
      reject(e);
    }
  });
};

module.exports = {
  gennerralAccessToken,
  gennerralRefreshToken,
  refreshTokenJwtSerice,
};
