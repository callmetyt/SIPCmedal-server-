//依赖引入
const Koa = require("koa"),
  app = new Koa(),
  config = require("./config/config.json"),
  koaBody = require("koa-body");

//跨域设置
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

//参数解析
app.use(
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
    },
  })
);

//路由引入
const router = require("./routes/router");
app.use(router);

//配置端口
app.listen(config.port, () => {
  console.log(`server is running on the port ${config.port}`);
});
