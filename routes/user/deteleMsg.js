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
      "getMsg.$[elem].show": false,
    },
    {
      useFindAndModify: true,
      lean: true,
      new: true,
      arrayFilters: [
        {
          "elem.id": {
            $in: data.msgId,
          },
        },
      ],
    }
  );
  if (sqlRes) {
    ctx.body = {
      status: true,
      msg: "删除成功",
    };
  } else {
    ctx.body = {
      status: false,
      msg: "删除失败",
    };
  }
});

module.exports = router.routes();
