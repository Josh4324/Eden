const DailyEdgeService = require("../services/dailyedge");
const { Response } = require("../helpers");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const dailyEdgeService = new DailyEdgeService();

exports.createDailyEdge = async (req, res) => {
  try {
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (result) {
        let image = result.secure_url;
        req.body.image = image;

        const dailyedge = await dailyEdgeService.createDailyEdge(req.body);

        const response = new Response(
          true,
          201,
          "Daily Edge created successfully",
          dailyedge
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

exports.updateDailyEdge = async (req, res) => {
  try {
    const id = req.params.id;
    const dailyedge = await dailyEdgeService.updateDailyEdge(id, req.body);

    const response = new Response(
      true,
      200,
      "Blog post updated successfully",
      dailyedge
    );
    res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};

exports.getAllDailyEdge = async (req, res) => {
  try {
    let limit = Number(req.query.limit);
    let skip = Number(req.query.skip);

    if (!limit) {
      limit = 10;
    }

    if (!skip) {
      skip = 0;
    }

    const dailyedge = await dailyEdgeService.findAllDailyEdge(limit, skip);

    const response = new Response(true, 200, "Success", dailyedge);
    res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};

exports.getOneDailyEdge = async (req, res) => {
  try {
    let id = req.params.id;

    const dailyedge = await dailyEdgeService.findDailyEdgeWithId(id);

    const response = new Response(true, 200, "Success", dailyedge);
    res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};
