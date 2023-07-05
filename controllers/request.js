const RequestService = require("../services/request");
const { Response } = require("../helpers");
const { requestLogger } = require("../logger");

const requestService = new RequestService();

exports.createRequest = async (req, res) => {
  const { id } = req.payload;
  try {
    req.body.userId = id;
    const post = await requestService.createRequest(req.body);
    const response = new Response(
      true,
      201,
      "Request created successfully",
      post
    );
    requestLogger.info(`Request Created - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    requestLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.updateRequest = async (req, res) => {
  const { id } = req.payload;
  try {
    const pid = req.params.id;
    const post = await requestService.updateRequest(pid, req.body);
    const response = new Response(
      true,
      200,
      "Request updated successfully",
      post
    );
    requestLogger.info(`Request Updated - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(false, 500, "Server Error", err);
    requestLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getAllRequest = async (req, res) => {
  const { id } = req.payload;
  try {
    const page = Number(req.query.page) || 1;
    const num = Number(req.query.limit) || 10;

    let offset;
    let limit;

    if (page === 1 || page === 0 || !page) {
      offset = 0;
      limit = num;
    } else {
      offset = (page - 1) * num;
      limit = num;
    }

    const requests = await requestService.findAllRequest(limit, offset);
    const response = new Response(true, 200, "Success", requests);
    requestLogger.info(`Get all requests - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    requestLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getOneRequest = async (req, res) => {
  const { id } = req.payload;
  try {
    let pid = req.params.id;
    const request = await requestService.findRequestWithId(pid);
    const response = new Response(true, 200, "Success", request);
    requestLogger.info(`Get request - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    requestLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};
