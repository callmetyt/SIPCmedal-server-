const router = require("koa-router")(),
  users = require("../../mongo/mongo").users,
  medals = require("../../mongo/mongo").medal,
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
  let res = undefined;
  //查询用户信息
  let sqlRes = await users
    .find(
      {},
      {
        userId: 1,
        userName: 1,
        medalNum: 1,
        avatar: 1,
        getMedal: 1,
      },
      {
        lean: true,
      }
    )
    .sort({ medalNum: 1 });
  //找到用户信息
  sqlRes.forEach((item, index) => {
    if (item.userId == data.userId) {
      res = item;
      res.rankNum = index + 1;
    }
  });
  //生成勋章id数组
  let findMedals = [];
  res.getMedal.forEach((item) => {
    findMedals.push(item.id);
  });
  //找到勋章数据
  let medalRes = await medals.find(
    {
      id: {
        $in: findMedals,
      },
    },
    {
      url: 1,
      name: 1,
      id: 1,
    },
    {
      lean: true,
    }
  );
  res.medals = medalRes;
  if (res) {
    ctx.body = {
      status: true,
      res,
    };
  } else {
    ctx.body = {
      status: false,
      msg: "数据库无数据",
    };
  }
});

module.exports = router.routes();
