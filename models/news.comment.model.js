const { Schema, model } = require("mongoose");

const newsCommentsSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "News Comment is required"],
    },
    commentText: {
      type: String,
      required: [true, "Comment Text is Required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const newsComments = model("newsComments", newsCommentsSchema);
module.exports = newsComments;
