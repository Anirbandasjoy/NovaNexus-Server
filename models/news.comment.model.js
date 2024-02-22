const { Schema, model } = require("mongoose");

const commentsSchema = Schema(
  {
    commentImage: {
      type: String,
    },
    commentText: {
      type: String,
      required: [true, "Comment Text is Required"],
    },
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: [true, "ProfileId is required "],
    },
  },
  {
    timestamps: true,
  }
);

const Comments = model("Comments", commentsSchema);
module.exports = Comments;
