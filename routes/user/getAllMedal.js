const router = require("koa-router")(),
  medal = require("../../mongo/mongo").medal,
  classList = require("../../mongo/mongo").classList;

router.get("/", async (ctx) => {
  let medalRes = await medal.find(
    {},
    {
      url: 1,
      name: 1,
      content: 1,
      className: 1,
      id: 1,
    },
    {
      lean: true,
    }
  );
  let classListRes = await classList.find(
    {},
    {
      _id: 0,
      name: 1,
    },
    {
      lean: true,
    }
  );
  if (medalRes && classListRes) {
    ctx.body = {
      status: true,
      medalRes,
      classListRes,
    };
  } else {
    ctx.body = {
      status: false,
      msg: "数据库暂无数据!",
    };
  }
});

module.exports = router.routes();
