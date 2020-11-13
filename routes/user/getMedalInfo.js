const router = require("koa-router")(),
  users = require("../../mongo/mongo").users,
  medal = require("../../mongo/mongo").medal,
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
  let medalRes = await medal.findOne(
    {
      id: data.medalId,
    },
    {
      _id: 0,
      url: 1,
      name: 1,
      content: 1,
    },
    {
      lean: true,
    }
  );
  if (!medalRes) {
    ctx.body = {
      status: false,
      msg: "没有这个勋章!",
    };
  } else {
    let usersRes = await users.findOne(
      {
        userId: data.userId,
      },
      {
        getMedal: 1,
        userName: 1,
      },
      {
        lean: true,
      }
    );
    usersRes.getMedal.forEach((item) => {
      if (item.id === data.medalId) {
        medalRes.date = item.date;
      }
    });
    ctx.body = {
      status: true,
      res: medalRes,
      userName: usersRes.userName,
    };
  }
});

module.exports = router.routes();
