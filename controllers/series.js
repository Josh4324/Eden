const SeriesService = require("../services/series");
const cloudinary = require("cloudinary").v2;
const { Response } = require("../helpers");
const { seriesLogger } = require("../logger");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const seriesService = new SeriesService();

exports.createSeries = async (req, res) => {
  const { id } = req.payload;
  try {
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (result) {
        let image = result.secure_url;
        req.body.image = image;
        const series = await seriesService.createSeries(req.body);
        const response = new Response(
          true,
          201,
          "Series created successfully",
          series
        );
        seriesLogger.info(`New series created by ${id}`);
        return res.status(response.code).json(response);
      }
    });
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    seriesLogger.error(`An error occured: ${err} - ${id}`);
    res.status(response.code).json(response);
  }
};

exports.updateSeries = async (req, res) => {
  const { id } = req.payload;
  try {
    const pid = req.params.id;
    const series = await seriesService.updateSeries(pid, req.body);

    const response = new Response(
      true,
      200,
      "Series updated successfully",
      series
    );
    seriesLogger.info(`Series Updated by ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    seriesLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getAllSeries = async (req, res) => {
  const { id } = req.payload;
  try {
    const page = Number(req.query.page) || 1;
    const num = Number(req.query.limit) || 10;
    let name = req.query.name;

    let offset;
    let limit;

    if (page === 1 || page === 0 || !page) {
      offset = 0;
      limit = num;
    } else {
      offset = (page - 1) * num;
      limit = num;
    }

    const series = await seriesService.findAllSeriesWithName(
      limit,
      offset,
      name
    );

    const response = new Response(true, 200, "Success", series);
    seriesLogger.info(`Get all series by ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    seriesLogger.error(`An error occured: ${err} - ${id}`);
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};

exports.getOneSeries = async (req, res) => {
  const { id } = req.payload;
  try {
    let pid = req.params.id;
    const series = await seriesService.findSeriesWithId(pid);
    const response = new Response(true, 200, "Success", series);
    seriesLogger.info(`Get one series - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    seriesLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};
