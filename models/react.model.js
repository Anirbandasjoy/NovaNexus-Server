const { Schema, model } = require("mongoose");

const reactSchema = Schema({
  react: {
    type: String,
    required: [true, "react is required feild"],
  },
  profileId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: [true, "profile id is required feild "],
  },
  newsId: {
    type: Schema.Types.ObjectId,
    ref: "News",
  },
});

const React = model("React", reactSchema);
module.exports = React;
