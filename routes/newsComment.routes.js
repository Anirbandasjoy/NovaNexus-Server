const newsCommentRouter = require("express").Router();
const {
  handleCreateComment,
} = require("../controllers/newsComment.controller");

newsCommentRouter.post("/", handleCreateComment);

module.exports = newsCommentRouter;
