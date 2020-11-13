const mongoose = require("mongoose");

let medal = new mongoose.Schema({
  url: {
    type: String,
  },
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  content: {
    type: String,
  },
  className: {
    type: String,
  },
  author: {
    type: String,
  },
  createTime: {
    type: Date,
  },
  ann: {
    type: String,
  },
});

module.exports = medal;
