const createError = require("http-errors");
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

const handleGetAllNews = async (req, res, next) => {
  try {
    const news = await News.find();
    if (!news || news.length === 0) {
      return createError(404, "News not found");
    }
    successResponse(res, {
      statusCode: 200,
      message: "fetched all news",
      payload: news,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
    next(error);
  }
};

const handleGetSingleNews = async (req, res, next) => {
  try {
    const id = req.params.id;
    const news = await News.findById(id).populate("comments");

    if (!news) {
      return createError(404, "News not found");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Fetched single news",
      payload: news,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
    next(error);
  }
};

module.exports = { handleCreateNews, handleGetAllNews, handleGetSingleNews };
