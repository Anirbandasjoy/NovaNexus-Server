const { successResponse, errorResponse } = require("../helper/response");
const newsComments = require("../models/news.comment.model");

const handleCreateComment = async (req, res, next) => {
  try {
    const { email, commentText } = req.body;
    const id = req.params.id;
    const comment = new newsComments({
      email,
      commentText,
    });

    const news = await News.findById(id);
    const saveComment = news.comments.push(comment);
    successResponse(res, {
      statusCode: 201,
      message: "Create a new comment",
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
