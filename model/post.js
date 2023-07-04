const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  details: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  link: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
