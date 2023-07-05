const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  topic: {
    type: String,
  },
  series: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  preacher: {
    type: String,
  },
  image: {
    type: String,
    required: [true, "Please provide the image"],
  },
  audio: {
    type: String,
  },
  youtube: {
    type: String,
  },
  summary: {
    type: String,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
