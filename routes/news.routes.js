const {
  handleCreateNews,
  handleGetAllNews,
  handleGetSingleNews,
  handleGetCategoryNews,
} = require("../controllers/news.controller");

const newsRouter = require("express").Router();
newsRouter.post("/", handleCreateNews);
newsRouter.get("/", handleGetAllNews);
newsRouter.get("/:id", handleGetSingleNews);
newsRouter.get("/category-news/:id", handleGetCategoryNews);
module.exports = newsRouter;
