const { Schema, model } = require("mongoose");

const bookmarkSchema = Schema({
  newsId: {
    type: Schema.Types.ObjectId,
    ref: "News",
    required: [true, "News Id is required feild"],
  },
});

const Bookmark = model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
