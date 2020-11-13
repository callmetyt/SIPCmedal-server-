const router = require("koa-router")(),
  mongo = require("../../mongo/mongo").users,
  verify = require("../verify/verify");

router.post("/", async (ctx, next) => {
  let jwtRes = await verify(ctx.request.body.token);
  if (jwtRes.status) {
    await next();
  } else {
    ctx.body = jwtRes;
  }
});

router.post("/", async (ctx) => {
  let data = ctx.request.body;
  let sqlRes = await mongo.findOne(
    {
      userId: data.userId,
    },
    {
      userName: 1,
      class: 1,
      phone: 1,
      mail: 1,
      qq: 1,
      weChat: 1,
      github: 1,
      blog: 1,
      avatar: 1,
    }
  );
  if (sqlRes) {
    ctx.body = {
      status: true,
      res: sqlRes,
    };
  } else {
    ctx.body = {
      status: false,
      msg: "查询错误（没有此条数据）",
    };
  }
});

module.exports = router.routes();
