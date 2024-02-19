const { errorResponse, successResponse } = require("../helper/response");
const Profile = require("../models/profile.model");

const createProfileInformation = async (req, res, next) => {
  try {
    const { fullName, email, profileImage, role } = req.body;
    const newProfile = await Profile.create({
      name,
      email,
      profileImage,
      role,
    });
    successResponse(res, {
      statusCode: 201,
      message: "Profile Created Successfully",
      payload: newProfile,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createProfileInformation,
};
