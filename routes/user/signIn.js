const router = require("koa-router")(),
  mongo = require("../../mongo/mongo").users,
  jwt = require("jsonwebtoken"),
  config = require("../../config/config.json");

router.post("/", async (ctx, next) => {
  let data = ctx.request.body;
  let sqlRes = await mongo.findOne({
    userId: data.userId,
    password: data.password,
  });
  if (sqlRes) {
    let token = jwt.sign(
      {
        userId: data.userId,
      },
      config.privateKey,
      {
        expiresIn: "12h",
      }
    );
    ctx.body = {
      status: true,
      userId: data.userId,
      token,
    };
  } else {
    ctx.body = {
      status: false,
      msg: "用户名或者密码错误!",
    };
  }
});

module.exports = router.routes();
