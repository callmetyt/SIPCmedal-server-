const mongoose = require("mongoose");

let classList = new mongoose.Schema({
  name: {
    type: String,
  },
  id: {
    type: String,
  },
  createTime: {
    type: Date,
  },
  author: {
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = classList;
