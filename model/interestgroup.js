const mongoose = require("mongoose");

const interestGroupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

const HomeGroup = mongoose.model("InterestGroup", interestGroupSchema);

module.exports = HomeGroup;
