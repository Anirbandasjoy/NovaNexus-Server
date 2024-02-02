const {
  handleCreateBookmark,
  handleGetAllBookmarkNews,
} = require("../controllers/bookmark.controller");

const bookmarkRouter = require("express").Router();

bookmarkRouter.post("/", handleCreateBookmark);
bookmarkRouter.get("/", handleGetAllBookmarkNews);

module.exports = bookmarkRouter;
