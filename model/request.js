const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  request: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
