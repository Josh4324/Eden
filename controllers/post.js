const PostService = require("../services/post");
const cloudinary = require("cloudinary").v2;
const { Response } = require("../helpers");
const { postLogger } = require("../logger");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const postService = new PostService();

exports.createPost = async (req, res) => {
  try {
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (result) {
        let image = result.secure_url;
        req.body.image = image;
        const post = await postService.createPost(req.body);
        const response = new Response(
          true,
          201,
          "Post created successfully",
          post
        );
        postLogger.info("New post created");
        return res.status(response.code).json(response);
      }
    });
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    postLogger.error(`An error occured: ${err}`);
    return res.status(response.code).json(response);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await postService.updatePost(id, req.body);

    const response = new Response(true, 200, "Post updated successfully", post);
    postLogger.info("Post Updated");
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    postLogger.error(`An error occured: ${err}`);
    return res.status(response.code).json(response);
  }
};

exports.updatePostImage = async (req, res) => {
  try {
    const id = req.params.id;
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (result) {
        let image = result.secure_url;
        req.body.image = image;
        const post = await postService.updatePost(id, req.body);
        const response = new Response(
          true,
          200,
          "Post created successfully",
          post
        );
        postLogger.info("Post Updated");
        return res.status(response.code).json(response);
      }
    });
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    postLogger.error(`An error occured: ${err}`);
    return res.status(response.code).json(response);
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const num = Number(req.query.limit) || 10;
    let category = req.query.category;

    let offset;
    let limit;

    if (page === 1 || page === 0 || !page) {
      offset = 0;
      limit = num;
    } else {
      offset = (page - 1) * num;
      limit = num;
    }

    const posts = await postService.findAllPost(limit, offset, category);
    const response = new Response(true, 200, "Success", posts);
    postLogger.info("GET all post");
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    postLogger.error(`An error occured: ${err}`);
    return res.status(response.code).json(response);
  }
};

exports.getOnePost = async (req, res) => {
  try {
    let id = req.params.id;
    const post = await postService.findPostWithId(id);
    const response = new Response(true, 200, "Success", post);
    postLogger.info("GET one post");
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    postLogger.error(`An error occured: ${err}`);
    return res.status(response.code).json(response);
  }
};
