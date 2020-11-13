const router = require("koa-router")(),
  verify = require("../verify/verify"),
  mongo = require("../../mongo/mongo").users;

router.post("/", async (ctx, next) => {
  let jwtRes = await verify(ctx.request.body.token);
  if (jwtRes.status) {
    await next();
  } else {
    ctx.body = jwtRes;
  }
});

router.post("/", async (ctx, next) => {
  let data = ctx.request.body;
  let sqlRes = await mongo
    .find(
      {},
      {
        userName: 1,
        medalNum: 1,
        userId: 1,
        avatar: 1,
      },
      {
        lean: true,
      }
    )
    .sort({ medalNum: 1 });
  let res = undefined;
  sqlRes.forEach((item, index) => {
    if (item.userId === data.userId) {
      res = item;
      res.rankNum = index + 1;
    }
  });
  ctx.body = {
    status: true,
    res,
  };
});

module.exports = router.routes();
