const newsCommentRouter = require("express").Router();
const {
  handleCreateComment,
  handleDeleteComment,
  handleNewsAssociatedCommentDeleted,
  handleGetAllComments,
} = require("../controllers/newsComment.controller");

newsCommentRouter.post("/:id", handleCreateComment);
newsCommentRouter.delete("/:id", handleDeleteComment);
newsCommentRouter.delete(
  "/comments/:commentId",
  handleNewsAssociatedCommentDeleted
);
newsCommentRouter.get("/", handleGetAllComments);

module.exports = newsCommentRouter;
