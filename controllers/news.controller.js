const { errorResponse, successResponse } = require("../helper/response");
const News = require("../models/news.model");

const handleCreateNews = async (req, res, next) => {
  try {
    const { title, number, badge, name, image, thumbnail_url, details } =
      req.body;
    const newNews = await News.create({
      title,
      rating: { number, badge },
      author: { name, image },
      thumbnail_url,
      details,
    });

    successResponse(res, {
      statusCode: 201,
      message: "News Created Success",
      payload: newNews,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
    next(error);
  }
};

module.exports = { handleCreateNews };
