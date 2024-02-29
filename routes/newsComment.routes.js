const newsCommentRouter = require("express").Router();
const {
  handleCreateComment,
  handleDeleteComment,
  handleNewsAssociatedCommentDeleted,
} = require("../controllers/newsComment.controller");

newsCommentRouter.post("/:id", handleCreateComment);
newsCommentRouter.delete("/:id", handleDeleteComment);
newsCommentRouter.delete("/comments/:commentId", handleNewsAssociatedCommentDeleted);

module.exports = newsCommentRouter;
