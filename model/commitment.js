const mongoose = require("mongoose");

const commitmentSchema = new mongoose.Schema({
  experience: {
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

const Commitment = mongoose.model("Instagram", commitmentSchema);

module.exports = Commitment;
