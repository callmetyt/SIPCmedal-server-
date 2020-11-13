const mongoose = require("mongoose");

let admins = new mongoose.Schema({
  adminName: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = admins;
