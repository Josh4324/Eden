const InterestGroupService = require("../services/interestgroup");
const { Response } = require("../helpers");
const { interestLogger } = require("../logger");

const interestGroupService = new InterestGroupService();

exports.createInterestGroup = async (req, res) => {
  const { id } = req.payload;
  try {
    req.body.userId = id;
    const group = await interestGroupService.createInterestGroup(req.body);
    const response = new Response(
      true,
      201,
      "Interest Group created successfully",
      group
    );
    interestLogger.info(`Interest Group Created - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    interestLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.updateInterestGroup = async (req, res) => {
  const { id } = req.payload;
  try {
    const pid = req.params.id;
    const group = await interestGroupService.updateInterestGroup(pid, req.body);
    const response = new Response(
      true,
      200,
      "Group updated successfully",
      group
    );
    interestLogger.info(`Interest Group Updated - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    interestLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getAllGroup = async (req, res) => {
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

    const group = await interestGroupService.findAllInterestGroup(
      limit,
      offset
    );
    const response = new Response(true, 200, "Success", group);
    interestLogger.info(`Get all interest group - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    interestLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getOneInterestGroup = async (req, res) => {
  const { id } = req.payload;
  try {
    let pid = req.params.id;
    const group = await interestGroupService.findInterestGroupWithId(pid);
    const response = new Response(true, 200, "Success", group);
    interestLogger.info(`Get interest group - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    interestLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.joinInterestGroup = async (req, res) => {
  const { id } = req.payload;
  try {
    const pid = req.params.id;

    const update = { users: id };
    const payload = { _id: pid };
    await interestGroupService.updateInterestAndPush(payload, update);

    const response = new Response(true, 200, "User added to Interest group");
    interestLogger.info(`User added to Interest group - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    interestLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};
