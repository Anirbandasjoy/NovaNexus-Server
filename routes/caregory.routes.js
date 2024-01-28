const categoryRouter = require("express").Router();
const {
  handleCreateCategory,
  handleGetAllCategories,
} = require("../controllers/category.controller");

categoryRouter.post("/", handleCreateCategory);
categoryRouter.get("/", handleGetAllCategories);

module.exports = categoryRouter;
