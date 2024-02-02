const createError = require("http-errors");
const { errorResponse, successResponse } = require("../helper/response");
const Bookmark = require("../models/bookmark.model");

const handleCreateBookmark = async (req, res, next) => {
  try {
    const { newsId } = req.body;
    const existingBookmark = await Bookmark.findOne({ newsId });
    if (existingBookmark) {
      return errorResponse(res, {
        statusCode: 403,
        message: "News already exists",
      });
    }
    const newBookmark = await Bookmark.create({
      newsId,
    });

    successResponse(res, {
      statusCode: 201,
      message: "Create a new bookmark",
      payload: newBookmark,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
    next(error);
  }
};

const handleGetAllBookmarkNews = async (req, res, next) => {
  try {
    const bookmarkNews = await Bookmark.find().populate("newsId");
    if (!bookmarkNews || bookmarkNews.length === 0) {
      return createError(404, "Not Found BookmarkNews");
    }
    successResponse(res, {
      statusCode: 200,
      message: "fetch all bookmarkNews",
      payload: bookmarkNews,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
    next(error);
  }
};

const handleDeleteBookmark = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedBookmark = await Bookmark.findByIdAndDelete(id);
    if (!deletedBookmark) {
      return createError(404, "News Not Found");
    }
    successResponse(res, {
      statusCode: 200,
      message: "Bookmark deleted successfully",
      payload: deletedBookmark,
    });

    console.log({ id });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
    next(error);
  }
};

module.exports = {
  handleCreateBookmark,
  handleGetAllBookmarkNews,
  handleDeleteBookmark,
};
