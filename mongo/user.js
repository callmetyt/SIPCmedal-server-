const mongoose = require("mongoose");

let users = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  medalNum: {
    type: String,
    default: "0",
  },
  avatar: {
    type: String,
  },
  class: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  qq: {
    type: String,
  },
  weChat: {
    type: String,
  },
  github: {
    type: String,
  },
  blog: {
    type: String,
  },
  mail: {
    type: String,
  },
  getMedal: [
    {
      id: {
        type: String,
      },
      date: {
        type: Date,
      },
    },
  ],
  getMsg: [
    {
      id: {
        type: String,
      },
      isRead: {
        type: Boolean,
      },
      show: {
        type: Boolean,
      },
    },
  ],
});

module.exports = users;
