const { successResponse, errorResponse } = require("../helper/response");
const Comments = require("../models/news.comment.model");
const News = require("../models/news.model");

const handleCreateComment = async (req, res, next) => {
  try {
    const { name, commentText, profileImage, commentImage } = req.body;
    const id = req.params.id;
    const comment = await Comments.create({
      name,
      profileImage,
      commentImage,
      commentText,
    });

    const news = await News.findById(id);
    news.comments.push(comment);
    await news.save();
    successResponse(res, {
      statusCode: 201,
      message: "Create a new comment",
      payload: comment,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
    next(error);
  }
};

module.exports = { handleCreateComment };
