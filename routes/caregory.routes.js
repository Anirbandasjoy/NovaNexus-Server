const categoryRouter = require("express").Router();
const {
  handleCreateCategory,
  handleGetAllCategories,
  handleDeleteCategory,
  handleEditCategory,
} = require("../controllers/category.controller");

categoryRouter.post("/", handleCreateCategory);
categoryRouter.get("/", handleGetAllCategories);
categoryRouter.delete("/delete/:id", handleDeleteCategory);
categoryRouter.put("/edit/:id", handleEditCategory);

module.exports = categoryRouter;
