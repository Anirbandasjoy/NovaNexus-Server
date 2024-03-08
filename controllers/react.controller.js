const { errorResponse, successResponse } = require("../helper/response");
const React = require("../models/react.model");

const handleCreateReact = async (req, res, next) => {
  try {
    const { newsId, profileId, react } = req.body;
    const existingReact = await React.findOne({ newsId, profileId });
    if (existingReact) {
      return errorResponse(res, {
        statusCode: 403,
        message: "react already exists for this News and Profile",
      });
    }
    const saveReact = await React.create({ newsId, profileId, react });
    successResponse(res, {
      statusCode: 201,
      message: "React created successfully",
      payload: saveReact,
    });
  } catch (error) {
    console.error("Error in handleCreateReact:", error);
    errorResponse(res, { message: error.message });
    next(error);
  }
};

const handlegetReact = async (req, res, next) => {
  try {
    const allReact = await React.find();
    if (!allReact || allReact.length === 0) {
      return res.status(404).send({ message: "Not Found React", code: 404 });
    }
    successResponse(res, {
      statusCode: 200,
      message: "fetch all react",
      payload: allReact,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
    next(error);
  }
};

const handleGetNewsReact = async (req, res, next) => {
  try {
    const newsId = req.params.newsId;
    const allReact = await React.find({ newsId });
    if (!allReact || allReact.length === 0) {
      return successResponse(res, {
        statusCode: 200,
        payload: allReact,
      });
    }
    successResponse(res, {
      statusCode: 200,
      message: "fetch all news with this id ",
      payload: allReact,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
    next(error);
  }
};

module.exports = {
  handleCreateReact,
  handlegetReact,
  handleGetNewsReact,
};
