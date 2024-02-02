const {
  handleCreateBookmark,
  handleGetAllBookmarkNews,
  handleDeleteBookmark,
} = require("../controllers/bookmark.controller");

const bookmarkRouter = require("express").Router();

bookmarkRouter.post("/", handleCreateBookmark);
bookmarkRouter.get("/", handleGetAllBookmarkNews);
bookmarkRouter.delete("/:id", handleDeleteBookmark);

module.exports = bookmarkRouter;
