const router = require("koa-router")(),
  jwt = require("jsonwebtoken"),
  config = require("../../config/config.json"),
  admins = require("../../mongo/mongo").admins;

router.post("/", async (ctx) => {
  let data = ctx.request.body;
  let sqlRes = await admins.findOne({
    adminName: data.adminName,
  });
  if (sqlRes) {
    let token = jwt.sign(
      {
        adminName: data.adminName,
      },
      config.privateKey,
      {
        expiresIn: "12h",
      }
    );
    ctx.body = {
      status: true,
      token,
    };
  } else {
    ctx.body = {
      status: false,
      msg: "用户名或者密码错误",
    };
  }
});

module.exports = router.routes();
