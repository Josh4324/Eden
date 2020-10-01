const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    featuredImage: {
        type: String,
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
    },
});


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;