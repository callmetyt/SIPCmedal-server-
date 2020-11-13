const mongoose = require("mongoose"),
  config = require("../config/config.json");

//连接mongoDB
mongoose
  .connect(`${config.mongoDB}/${config.dataBase}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB connect success!");
  })
  .catch((err) => {
    console.log(`mongoDB connect fail! ${err}`);
  });

//引入Schema
let users = require("./user");
let medal = require("./medal");
let classList = require("./classList");
let msg = require("./msg");
let admins = require("./admins");

//导出collection
module.exports = {
  users: mongoose.model("users", users, "users"),
  medal: mongoose.model("medal", medal, "medal"),
  classList: mongoose.model("classList", classList, "classList"),
  msg: mongoose.model("msg", msg, "msg"),
  admins: mongoose.model("admins", admins, "admins"),
};
