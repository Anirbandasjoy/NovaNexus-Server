const { successResponse, errorResponse } = require("../helper/response");
const Category = require("../models/category.model");
const {
  getCategories,
  createCategory,
} = require("../services/category.service");

// Category creating function
const handleCreateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await createCategory(name);
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
    const categories = await getCategories();
    successResponse(res, {
      statusCode: 200,
      message: "fetch all categories",
      payload: categories,
    });
  } catch (error) {
    errorResponse(res, {
      // Corrected typo here
      statusCode: 500,
      message: "Internal Server Error",
    });
    next(error);
  }
};

const handleEditCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Category not found",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: "Category updated successfully",
      payload: updatedCategory,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
    next(error);
  }
};

const handleDeleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Category not found",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: "Category deleted successfully",
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
    next(error);
  }
};

module.exports = {
  handleCreateCategory,
  handleGetAllCategories,
  handleEditCategory,
  handleDeleteCategory,
};
