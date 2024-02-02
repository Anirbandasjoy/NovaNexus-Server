const newsCommentRouter = require("express").Router();
const {
  handleCreateComment,
  handleDeleteComment,
} = require("../controllers/newsComment.controller");

newsCommentRouter.post("/:id", handleCreateComment);
newsCommentRouter.delete("/:id", handleDeleteComment);

module.exports = newsCommentRouter;
