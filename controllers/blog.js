const BlogService = require("../services/blog");
const { Response } = require("../helpers");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const blogService = new BlogService();

exports.createBlog = async (req, res) => {
  try {
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (result) {
        let image = result.secure_url;
        req.body.image = image;

        const blog = await blogService.createBlog(req.body);

        const response = new Response(
          true,
          201,
          "Blog Post created successfully",
          blog
        );
        res.status(response.code).json(response);
      }
    });
  } catch (err) {
    console.log(err);
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogService.updateBlog(id, req.body);

    const response = new Response(
      true,
      200,
      "Blog post updated successfully",
      blog
    );
    res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};

exports.getAllBlog = async (req, res) => {
  try {
    let limit = Number(req.query.limit);
    let skip = Number(req.query.skip);

    if (!limit) {
      limit = 10;
    }

    if (!skip) {
      skip = 0;
    }

    const blog = await blogService.findAllBlog(limit, skip);

    const response = new Response(true, 200, "Success", blog);
    res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};

exports.getOneBlog = async (req, res) => {
  try {
    let id = req.params.id;

    const blog = await blogService.findBlogWithId(id);

    const response = new Response(true, 200, "Success", blog);
    res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};
