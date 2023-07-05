const MessageService = require("../services/message");
const SeriesService = require("../services/series");
const cloudinary = require("cloudinary").v2;
const { Response } = require("../helpers");
const { messageLogger } = require("../logger");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const messageService = new MessageService();
const seriesService = new SeriesService();

exports.createMessage = async (req, res) => {
  const { id } = req.payload;
  try {
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
        const message = await messageService.createMessage(req.body);
        const update = { messages: message._id };
        const payload = { name };
        await seriesService.updateSeriesAndPush(payload, update);

        const response = new Response(
          true,
          201,
          "Message created successfully",
          message
        );
        messageLogger.info(`New message created - ${id}`);
        return res.status(response.code).json(response);
      }
    });
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    messageLogger.error(`An error occured: ${err} - ${id}`);
    res.status(response.code).json(response);
  }
};

exports.updateMessage = async (req, res) => {
  const { id } = req.payload;
  try {
    const pid = req.params.id;

    const message = await messageService.updateMessage(pid, req.body);

    const response = new Response(
      true,
      200,
      "Message updated successfully",
      message
    );
    messageLogger.info(`Message updated - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    messageLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getAllMessages = async (req, res) => {
  const { id } = req.payload;
  try {
    const page = Number(req.query.page) || 1;
    const num = Number(req.query.limit) || 10;
    let topic = req.query.topic;
    let pastor = req.query.pastor;

    let offset;
    let limit;

    if (page === 1 || page === 0 || !page) {
      offset = 0;
      limit = num;
    } else {
      offset = (page - 1) * num;
      limit = num;
    }

    const messages = await messageService.findAllMessages(
      limit,
      offset,
      topic,
      pastor
    );

    const response = new Response(true, 200, "Success", messages);
    messageLogger.info(`Get All messages - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    messageLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getOneMessage = async (req, res) => {
  const { id } = req.payload;
  try {
    let pid = req.params.id;

    const message = await messageService.findMessageWithId(pid);
    const response = new Response(true, 200, "Success", message);
    messageLogger.info(`Get One message - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    messageLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};
