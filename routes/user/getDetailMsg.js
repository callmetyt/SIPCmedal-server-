const router = require("koa-router")(),
  verify = require("../verify/verify"),
  msg = require("../../mongo/mongo").msg,
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
  //找到信息内容
  let sqlRes = await msg.findOne(
    {
      id: data.msgId,
    },
    {
      author: 1,
      content: 1,
      extraUrl: 1,
    },
    {
      lean: true,
    }
  );
  //修改为已读
  await users.findOneAndUpdate(
    {
      userId: data.userId,
    },
    {
      "getMsg.$[elem].isRead": true,
    },
    {
      arrayFilters: [{ "elem.id": data.msgId }],
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
      msg: "没有这个消息",
    };
  }
});

module.exports = router.routes();
