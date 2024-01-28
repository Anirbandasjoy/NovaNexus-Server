const { handleCreateNews } = require("../controllers/news.controller");

const newsRouter = require("express").Router();
newsRouter.post("/", handleCreateNews);
module.exports = newsRouter;
