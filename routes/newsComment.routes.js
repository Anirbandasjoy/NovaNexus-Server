const newsCommentRouter = require("express").Router();
const {
  handleCreateComment,
} = require("../controllers/newsComment.controller");

newsCommentRouter.post("/:id", handleCreateComment);

module.exports = newsCommentRouter;
