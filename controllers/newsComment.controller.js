const { successResponse, errorResponse } = require("../helper/response");
const Comments = require("../models/news.comment.model");
const News = require("../models/news.model");

const handleCreateComment = async (req, res, next) => {
  try {
    const { commentText, commentImage, profileId } = req.body;
    const id = req.params.id;
    const comment = await Comments.create({
      profileId,
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

const handleDeleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const newsId = req.query.newsId;
    const news = await News.findById(newsId);
    const commentIndex = news.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Comment not found",
      });
    } else {
      const deletedComment = news.comments.splice(commentIndex, 1)[0];
      await news.save();
      return successResponse(res, {
        statusCode: 200,
        message: "Comment deleted successfully",
        payload: deletedComment,
      });
    }
  } catch (error) {
    console.log(error.message);
    errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
    next(error);
  }
};

const handleNewsAssociatedCommentDeleted = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const deletedComment = await Comments.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Comment deleted successfully",
      payload: deletedComment,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
    next(error);
  }
};

const handleGetAllComments = async (req, res, next) => {
  try {
    const comments = await Comments.find();
    successResponse(res, {
      statusCode: 200,
      message: "Fetch all comments",
      payload: comments,
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
  handleCreateComment,
  handleDeleteComment,
  handleNewsAssociatedCommentDeleted,
  handleGetAllComments,
};
