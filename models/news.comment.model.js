const { Schema, model } = require("mongoose");

const commentsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "News Comment author is required"],
    },
    profileImage: {
      type: String,
      required: [true, "News Comment author image is required"],
    },
    commentText: {
      type: String,
      required: [true, "Comment Text is Required"],
    },
  },
  {
    timestamps: true,
  }
);

const Comments = model("Comments", commentsSchema);
module.exports = Comments;
