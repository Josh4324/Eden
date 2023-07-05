const MessageService = require("../services/message");
const SeriesService = require("../services/series");
const InstagramService = require("../services/commitment");
const DailyEdgeService = require("../services/dailyedge");
const BlogService = require("../services/blog");
const { Response } = require("../helpers");

const messageService = new MessageService();
const seriesService = new SeriesService();
const instagramService = new InstagramService();
const dailyEdgeService = new DailyEdgeService();
const blogService = new BlogService();

exports.getHomePosts = async (req, res) => {
  try {
    let limit = 2;
    let skip = 0;

    const messages = await messageService.findAllMessages(limit, skip);
    const series = await seriesService.findAllSeries(limit, skip);
    const instagram = await instagramService.findAllInstagram(limit, skip);
    const dailyedge = await dailyEdgeService.findAllDailyEdge(limit, skip);
    const blog = await blogService.findAllBlog(limit, skip);

    const data = {
      messages,
      series,
      instagram,
      dailyedge,
      blog,
    };

    const response = new Response(true, 200, "Success", data);
    res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};
