const MessageService = require("../services/message");
const SeriesService = require("../services/series");
const cloudinary = require("cloudinary").v2;
const { Response } = require("../helpers");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const messageService = new MessageService();
const seriesService = new SeriesService();

exports.createMessage = async (req, res) => {
  try {
    // Todo
    // test for case sensitivity
    const name = req.body.series;
    const checkSeries = seriesService.findSeriesWithName(name);

    if (checkSeries.length === 0) {
      const response = new Response(
        true,
        409,
        "This series does not exists, please create a series before creating a message"
      );
      res.status(response.code).json(response);
    }

    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (result) {
        let image = result.secure_url;
        req.body.image = image;
        console.log(req.body);
        const message = await messageService.createMessage(req.body);
        const update = { messages: message._id };
        const payload = { name };
        const updatedseries = await seriesService.updateSeriesAndPush(
          payload,
          update
        );

        const response = new Response(
          true,
          201,
          "Message created successfully",
          message
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

exports.updateMessage = async (req, res) => {
  try {
    const id = req.params.id;

    const message = await messageService.updateMessage(id, req.body);

    const response = new Response(
      true,
      200,
      "Message updated successfully",
      message
    );
    res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    let limit = Number(req.query.limit);
    let skip = Number(req.query.skip);

    if (!limit) {
      limit = 10;
    }

    if (!skip) {
      skip = 0;
    }

    const messages = await messageService.findAllMessages(limit, skip);

    const response = new Response(true, 200, "Success", messages);
    res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};

exports.getOneMessage = async (req, res) => {
  try {
    let id = req.params.id;

    const message = await messageService.findMessageWithId(id);

    const response = new Response(true, 200, "Success", message);
    res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};
