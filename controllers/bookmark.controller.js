const createError = require("http-errors");
const { errorResponse, successResponse } = require("../helper/response");
const Bookmark = require("../models/bookmark.model");

// create bookmark api
const handleCreateBookmark = async (req, res, next) => {
  try {
    const { newsId, profileId } = req.body;
    const existingBookmark = await Bookmark.findOne({ newsId, profileId });

    if (existingBookmark) {
      return errorResponse(res, {
        statusCode: 403,
        message: "Bookmark already exists for this News and Profile",
      });
    }
    const newBookmark = await Bookmark.create({
      newsId,
      profileId,
    });

    successResponse(res, {
      statusCode: 201,
      message: "Created a new bookmark",
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
    const bookmarkNews = await Bookmark.find()
      .populate("newsId")
      .populate("profileId");
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
