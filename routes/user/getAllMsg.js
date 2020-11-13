const router = require("koa-router")(),
  msg = require("../../mongo/mongo").msg,
  users = require("../../mongo/mongo").users,
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
  // 用户获得的消息
  let userRes = await users.findOne(
    {
      userId: data.userId,
    },
    {
      getMsg: 1,
    },
    {
      lean: true,
    }
  );

  // 生成消息数组
  let findMsgs = [];
  userRes.getMsg.forEach((item) => {
    if (item.show) {
      findMsgs.push(item.id);
    }
  });

  // 查询消息内容
  let msgContent = await msg
    .find(
      {
        id: {
          $in: findMsgs,
        },
      },
      {
        id: 1,
        title: 1,
        createDate: 1,
      },
      {
        lean: true,
      }
    )
    .sort({ createDate: -1 });

  //合成最终结果
  let res = [];
  msgContent.forEach((msg) => {
    userRes.getMsg.forEach((item, i, a) => {
      if (msg.id === item.id) {
        msg.isRead = item.isRead;
        a.splice(i, 1);
      }
    });
    res.push(msg);
  });

  if (userRes) {
    if (msgContent) {
      ctx.body = {
        status: true,
        res,
      };
    } else {
      ctx.body = {
        status: false,
        msg: "暂无消息",
      };
    }
  } else {
    ctx.body = {
      status: false,
      msg: "没有这个用户",
    };
  }
});

module.exports = router.routes();
