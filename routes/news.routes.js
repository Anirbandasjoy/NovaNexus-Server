const {
  handleCreateNews,
  handleGetAllNews,
  handleGetSingleNews,
} = require("../controllers/news.controller");

const newsRouter = require("express").Router();
newsRouter.post("/", handleCreateNews);
newsRouter.get("/", handleGetAllNews);
newsRouter.get("/:id", handleGetSingleNews);
module.exports = newsRouter;
