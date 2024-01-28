const categoryRouter = require("express").Router();
const { handleCreateCategory } = require("../controllers/category.controller");

categoryRouter.post("/", handleCreateCategory);

module.exports = categoryRouter;
