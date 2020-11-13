//依赖引入
const router = require("koa-router")(),
  clientRoute = "/user",
  adminRoute = "/admin";

//路由引入
//user
const signIn = require("./user/signIn");
const getBaseInfo = require("./user/getBaseInfo");
const getRank = require("./user/getRank");
const getAllInfo = require("./user/getAllInfo");
const setBaseInfo = require("./user/setBaseInfo");
const setAvatar = require("./user/setAvatar");
const getAllMedal = require("./user/getAllMedal");
const getMedalInfo = require("./user/getMedalInfo");
const getHasMedal = require("./user/getHasMedal");
const getAllMsg = require("./user/getAllMsg");
const deleteMsg = require("./user/deteleMsg");
const readAllMsg = require("./user/readAllMsg");
const getDetailMsg = require("./user/getDetailMsg");

router.use(`${clientRoute}/signIn`, signIn);
router.use(`${clientRoute}/getBaseInfo`, getBaseInfo);
router.use(`${clientRoute}/getRank`, getRank);
router.use(`${clientRoute}/getAllInfo`, getAllInfo);
router.use(`${clientRoute}/setBaseInfo`, setBaseInfo);
router.use(`${clientRoute}/setAvatar`, setAvatar);
router.use(`${clientRoute}/getAllMedal`, getAllMedal);
router.use(`${clientRoute}/getMedalInfo`, getMedalInfo);
router.use(`${clientRoute}/getHasMedal`, getHasMedal);
router.use(`${clientRoute}/getAllMsg`, getAllMsg);
router.use(`${clientRoute}/deleteMsg`, deleteMsg);
router.use(`${clientRoute}/readAllMsg`, readAllMsg);
router.use(`${clientRoute}/getDetailMsg`, getDetailMsg);

//admin
const AsignIn = require("./admin/signIn");
router.use(`${adminRoute}/signIn`, AsignIn);

//test
router.get("/", async (ctx) => {
  ctx.body = {
    status: true,
    msg: "router install success!",
  };
});

module.exports = router.routes();
