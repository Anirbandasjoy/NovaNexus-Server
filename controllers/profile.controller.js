const { errorResponse, successResponse } = require("../helper/response");
const Comments = require("../models/news.comment.model");
const News = require("../models/news.model");
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
// create verify user api
const createVerifyUserProfile = async (req, res, next) => {
  try {
    const { isVerified } = req.body;
    const email = req.params.email;

    const userProfile = await Profile.findOne({ email });

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { email },
      { isVerified },
      { new: true }
    );

    successResponse(res, {
      statusCode: 200,
      message: "User profile Verification updated successfully",
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

const deleteUserProfile = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Find and delete user comments on their own posts
    const userNewsList = await News.find({ profileId: id });
    let deletedUserComments = [];
    if (userNewsList && userNewsList.length > 0) {
      for (const news of userNewsList) {
        const deleteCommentsResult = await Comments.deleteMany({
          _id: { $in: news.comments },
        });
        deletedUserComments.push({
          newsId: news._id,
          deletedCount: deleteCommentsResult.deletedCount,
        });
      }
    }

    // Find and delete user comments on other posts
    const otherPostCommentDelete = await Comments.deleteMany({
      profileId: id,
    });

    // Find news posts associated with the user and clear their comments
    const newsList = await News.find({ profileId: { $ne: id } });
    for (const news of newsList) {
      news.comments = news.comments.filter(
        (commentId) => !news.comments.includes(commentId)
      );
      await news.save(); // Save each news after filtering comments
    }

    // Delete user news
    const userNews = await News.deleteMany({ profileId: id });

    // Delete user profile
    const deleteUserProfile = await Profile.findByIdAndDelete(id);

    // Check if user profile exists
    if (!deleteUserProfile) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User Not Found",
      });
    }

    // Send success response
    successResponse(res, {
      statusCode: 200,
      message: "User Deleted Successfully",
      payload: {
        deletedUser: deleteUserProfile,
        deleteUserNews: userNews,
        deleteUserComments: deletedUserComments,
        deleteOtherPostComments: otherPostCommentDelete,
      },
    });
  } catch (error) {
    console.log(error);
    // Handle errors
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
    next(error);
  }
};

module.exports = {
  createProfileInformation,
  updateProfileInformation,
  getUserProfileSingleInformation,
  getAllUserPrfoile,
  createVerifyUserProfile,
  deleteUserProfile,
};
