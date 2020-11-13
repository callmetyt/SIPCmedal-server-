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
  let sqlRes = await mongo.findOneAndUpdate(
    {
      userId: data.userId,
    },
    {
      $set: {
        phone: data.phone,
        mail: data.mail,
        qq: data.qq,
        weChat: data.weChat,
        github: data.github,
        blog: data.blog,
      },
    },
    {
      new: true,
      lean: true,
      useFindAndModify: false,
    }
  );
  if (sqlRes) {
    let res = {
      phone: sqlRes.phone,
      mail: sqlRes.mail,
      qq: sqlRes.qq,
      weChat: sqlRes.weChat,
      github: sqlRes.github,
      blog: sqlRes.blog,
    };
    ctx.body = {
      status: true,
      res,
      msg: "修改成功",
    };
  } else {
    ctx.body = {
      status: false,
      msg: "修改错误",
    };
  }
});

module.exports = router.routes();
