const createError = require("http-errors");
const { errorResponse, successResponse } = require("../helper/response");
const News = require("../models/news.model");

const handleCreateNews = async (req, res, next) => {
  try {
    const {
      title,
      number,
      badge,
      name,
      image,
      thumbnail_url,
      details,
      category,
    } = req.body;
    const newNews = await News.create({
      title,
      // rating: { number, badge },
      author: { name, image },
      thumbnail_url,
      details,
      category,
    });

    successResponse(res, {
      statusCode: 201,
      message: "News Created Success",
      payload: newNews,
    });
  } catch (error) {
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
      message: error.message || "Internal server error",
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

// get News using Category

const handleGetCategoryNews = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return createError(404, "Category Not Found");
    }

    const news = await News.find({ category: id });

    if (!news || news.length === 0) {
      return createError(404, "No News Found for the Category");
    }

    successResponse(res, {
      message: "Fetched news for the category",
      payload: news,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
    next();
  }
};

module.exports = {
  handleCreateNews,
  handleGetAllNews,
  handleGetSingleNews,
  handleGetCategoryNews,
};
