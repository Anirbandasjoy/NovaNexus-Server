const { Schema, model } = require("mongoose");

const profileSchema = Schema(
  {
    fullName: {
      type: String,
      required: [true, "Profile name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "User email is required"],
    },
    profileImage: {
      type: String,
      default: null,
    },
    isVerified: {
      type: String,
      default: "normal",
    },
    backgroundImage: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      required: [true, "User role is required"],
    },
  },
  { timestamps: true }
);

const Profile = model("Profile", profileSchema);
module.exports = Profile;
