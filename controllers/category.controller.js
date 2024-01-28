const slugify = require("slugify");
const Category = require("../models/category.model");
const { successResponse, errorResponse } = require("../helper/response");

// Category creating function
const handleCreateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({
      name: name,
      slug: slugify(name),
    });
    successResponse(res, {
      statusCode: 201,
      message: "Category created Successfully",
      payload: newCategory,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
    next(error);
  }
};

// get all category function

const handleGetAllCategories = async (req, res, next) => {
  try {
    jdfd;
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  handleCreateCategory,
};
