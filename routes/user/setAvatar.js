const router = require("koa-router")(),
  mongo = require("../../mongo/mongo").users,
  verify = require("../verify/verify"),
  config = require("../../config/config.json"),
  OSS = require("ali-oss"),
  fs = require("fs");

//阿里云oss客户端
let client = new OSS({
  region: "oss-cn-beijing",
  accessKeyId: config.AccessKeyID,
  accessKeySecret: config.AccessKeySecret,
});
client.useBucket("sipcmedal");

router.post("/", async (ctx, next) => {
  let data = ctx.request.body;
  let jwtRes = await verify(data.token);
  if (jwtRes.status) {
    next();
  } else {
    ctx.body = jwtRes;
  }
});

router.post("/", async (ctx) => {
  let data = ctx.request.body;
  let file = ctx.request.files.file;
  // console.log(data.oldAvatar);
  //读取文件
  const reader = fs.readFileSync(file.path);
  //删除原来的文件
  let ossRes = await client.delete(data.oldAvatar);
  // console.log(ossRes.res.status);
  //上传到阿里云OSS
  ossRes = await client.put(file.name, reader);
  // console.log(ossRes.url);
  //更新数据库的url
  let sqlRes = await mongo.findOneAndUpdate(
    {
      userId: data.userId,
    },
    {
      avatar: ossRes.url,
    },
    {
      useFindAndModify: false,
    }
  );
});

module.exports = router.routes();
