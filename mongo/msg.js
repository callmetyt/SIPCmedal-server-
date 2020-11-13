const mongoose = require("mongoose");

let msg = new mongoose.Schema({
  id: {
    type: String,
  },
  author: {
    type: String,
  },
  createDate: {
    type: Date,
    default: new Date(),
  },
  updateDate: {
    type: Date,
    default: new Date(),
  },
  content: {
    type: String,
  },
  extraUrl: {
    type: String,
  },
  title: {
    type: String,
  },
  exist: {
    type: Boolean,
  },
});

module.exports = msg;
