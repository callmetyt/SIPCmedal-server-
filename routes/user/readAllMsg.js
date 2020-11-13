const router = require("koa-router")(),
  verify = require("../verify/verify"),
  users = require("../../mongo/mongo").users;

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
  let sqlRes = await users.findOneAndUpdate(
    {
      userId: data.userId,
    },
    {
      "getMsg.$[elem].isRead": true,
    },
    {
      useFindAndModify: false,
      arrayFilters: [
        {
          "elem.id": {
            $in: data.msgId,
          },
        },
      ],
      new: true,
    }
  );
  if (sqlRes) {
    ctx.body = {
      status: true,
      msg: "操作成功",
    };
  } else {
    ctx.body = {
      status: false,
      msg: "操作失败",
    };
  }
});

module.exports = router.routes();
