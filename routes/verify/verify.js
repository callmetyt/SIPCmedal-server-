const jwt = require("jsonwebtoken"),
  config = require("../../config/config.json"),
  mongo = require("../../mongo/mongo").users;

module.exports = async function jwtVerify(token) {
  if (token) {
    let tokenDe;
    try {
      tokenDe = jwt.verify(token, config.privateKey);
    } catch (err) {
      if (err.name == "TokenExpiredError") {
        return {
          status: false,
          msg: "token过期，请重新登录",
        };
      } else {
        return {
          status: false,
          msg: "token错误，请重新登录",
        };
      }
    }
    let sqlRes = await mongo.findOne({
      userId: tokenDe.userId,
    });
    if (sqlRes) {
      return {
        status: true,
      };
    } else {
      return {
        status: false,
        msg: "token错误，请重新登录",
      };
    }
  } else {
    return {
      status: false,
      msg: "没有传入token，请重新登录",
    };
  }
};
