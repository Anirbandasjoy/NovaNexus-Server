const { Schema, model } = require("mongoose");

const commentsSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "News Comment is required"],
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
