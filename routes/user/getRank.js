const router = require("koa-router")(),
  mongo = require("../../mongo/mongo").users;

router.get("/", async (ctx) => {
  let sqlRes = await mongo
    .find(
      {},
      {
        medalNum: 1,
        userName: 1,
        userId: 1,
        avatar: 1,
      }
    )
    .sort({ medalNum: 1 })
    .limit(10);
  if (sqlRes) {
    ctx.body = {
      status: true,
      res: sqlRes,
    };
  } else {
    ctx.body = {
      status: false,
      msg: "查询错误或者数据库为空",
    };
  }
});

module.exports = router.routes();
