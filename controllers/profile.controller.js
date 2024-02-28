const { errorResponse, successResponse } = require("../helper/response");
const Profile = require("../models/profile.model");
// create user Profile
const createProfileInformation = async (req, res, next) => {
  try {
    const { fullName, email, profileImage, role } = req.body;

    const existUserProfile = await Profile.findOne({ email });
    if (existUserProfile) {
      return res.status(200).json(existUserProfile);
    } else {
      const newProfile = await Profile.create({
        fullName,
        email,
        profileImage,
        role,
      });
      successResponse(res, {
        statusCode: 201,
        message: "Profile Created Successfully",
        payload: newProfile,
      });
    }
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
    next();
  }
};
// update Profile Information
const updateProfileInformation = async (req, res, next) => {
  try {
    const { fullName, profileImage, backgroundImage } = req.body;
    const email = req.params.email;

    const userProfile = await Profile.findOne({ email });

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { email },
      { fullName, profileImage, backgroundImage },
      { new: true }
    );

    successResponse(res, {
      statusCode: 200,
      message: "User information updated successfully",
      payload: updatedProfile,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
    next();
  }
};
// get single user
const getUserProfileSingleInformation = async (req, res, next) => {
  try {
    const email = req.params.email;
    const userProfile = await Profile.findOne({ email });
    if (!userProfile) {
      return res.status(404).json({ message: "User Profile Not Found" });
    }
    successResponse(res, {
      statusCode: 200,
      message: "Single User Profile Get Successfully",
      payload: userProfile,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
    next();
  }
};
// get all user profile

const getAllUserPrfoile = async (req, res, next) => {
  try {
    const userProfiles = await Profile.find();
    if (!userProfiles || userProfiles.length === 0) {
      return res.status(404).json({ message: "User Profile Not Found" });
    }
    successResponse(res, {
      statusCode: 200,
      message: "All User Profile Get Successfully",
      payload: userProfiles,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
    next();
  }
};

module.exports = {
  createProfileInformation,
  updateProfileInformation,
  getUserProfileSingleInformation,
  getAllUserPrfoile,
};
