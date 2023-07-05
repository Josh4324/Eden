const CommitService = require("../services/commitment");
const { Response } = require("../helpers");
const { commitmentLogger } = require("../logger");

const commitService = new CommitService();

exports.createCommit = async (req, res) => {
  const { id } = req.payload;
  try {
    req.body.userId = id;
    const post = await commitService.createCommit(req.body);
    const response = new Response(
      true,
      201,
      "Request created successfully",
      post
    );
    commitmentLogger.info(`Commit Created - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    commitmentLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.updateCommit = async (req, res) => {
  const { id } = req.payload;
  try {
    const pid = req.params.id;
    const post = await commitService.updateCommit(pid, req.body);
    const response = new Response(
      true,
      200,
      "Request updated successfully",
      post
    );
    commitmentLogger.info(`Commit Updated - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(false, 500, "Server Error", err);
    commitmentLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getAllCommit = async (req, res) => {
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

    const requests = await commitService.findAllCommit(limit, offset);
    const response = new Response(true, 200, "Success", requests);
    commitmentLogger.info(`Get all commits - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    commitmentLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getOneCommit = async (req, res) => {
  const { id } = req.payload;
  try {
    let pid = req.params.id;
    const request = await commitService.findCommitWithId(pid);
    const response = new Response(true, 200, "Success", request);
    commitmentLogger.info(`Get commit - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    commitmentLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};
