const createError = require("http-errors");
const { errorResponse, successResponse } = require("../helper/response");
const News = require("../models/news.model");
// const Profile = require("../models/profile.model");
const handleCreateNews = async (req, res, next) => {
  try {
    const { title, profileId, thumbnail_url, details, category } = req.body;
    const newNews = await News.create({
      title,
      profileId,
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
    const news = await News.find()
      .populate("profileId")
      .populate({
        path: "comments",
        populate: {
          path: "profileId",
          model: "Profile",
        },
      });
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
    const news = await News.findById(id)
      .populate({
        path: "comments",
        populate: {
          path: "profileId",
          model: "Profile",
        },
      })
      .populate("profileId");

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
      message: error.message,
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

// deleteNews

const handleDeleteNews = async (req, res, next) => {
  try {
    const id = req.params.id;
    const news = await News.findByIdAndDelete(id);

    if (news) {
      return successResponse(res, {
        statusCode: 200,
        message: "News Deleted Successfully",
        payload: news,
      });
    } else {
      return res.status(403).send({ message: "News Not Deleted" });
    }
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });

    next(error);
  }
};
// update news

const handleUpdateNews = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, details } = req.body;

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).send({ message: "News not Found With This ID " });
    }
    const updatedNews = await News.findOneAndUpdate(
      {
        _id: id,
      },
      {
        title,
        details,
      },
      {
        new: true,
      }
    );
    successResponse(res, {
      statusCode: 200,
      message: "News Updated Successfully",
      payload: updatedNews,
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
  handleCreateNews,
  handleGetAllNews,
  handleGetSingleNews,
  handleGetCategoryNews,
  handleDeleteNews,
  handleUpdateNews,
};
