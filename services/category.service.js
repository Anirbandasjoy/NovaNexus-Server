const createError = require("http-errors");
const slugify = require("slugify");
const Category = require("../models/category.model");
const getCategories = async () => {
  const categories = await Category.find({}).select("name slug").lean();
  if (!categories || categories.length === 0) {
    return createError(404, "Category not found");
  }

  return categories;
};

const createCategory = async (name) => {
  const newCategory = await Category.create({
    name: name,
    slug: slugify(name),
  });

  return newCategory;
};

module.exports = { getCategories, createCategory };
