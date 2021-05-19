const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide the title of the blog"]
    },
    image: {
        type: String,
        required: [true, "Please provide the featured image of the blog"]
    },
    body: {
        type: String,
        required: [true, "Please provide the body of the blog"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;