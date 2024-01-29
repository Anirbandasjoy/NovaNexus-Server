const { body } = require("express-validator");

const newsValidator = [
  body("number")
    .trim()
    .notEmpty()
    .withMessage("news rating number is required"),
  body("badge").trim().notEmpty().withMessage("news rating badge is required"),
  body("title").trim().notEmpty().withMessage("news title is required"),
  body("name").trim().notEmpty().withMessage("news author name is required"),
  body("image").trim().notEmpty().withMessage("news author image is required"),
  body("thumbnail_url")
    .trim()
    .notEmpty()
    .withMessage("news thumbnail_url  is required"),
  body("details").trim().notEmpty().withMessage("news details  is required"),
  body("category").notEmpty().withMessage("News Category is required"),
];

module.exports = { newsValidator };
