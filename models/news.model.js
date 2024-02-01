const { Schema, model } = require("mongoose");

const newsSchema = Schema(
  {
    other_info: {
      is_today_pick: {
        type: Boolean,
        default: false,
      },
      is_tranding: {
        type: Boolean,
        default: false,
      },
    },
    like: {
      type: Number,
      default: 0,
    },
    // rating: {
    //   number: {
    //     type: Number,
    //     required: true,
    //   },
    //   badge: {
    //     type: String,
    //     required: true,
    //   },
    // },
    title: {
      type: String,
      required: [true, "News Title is required"],
    },
    author: {
      name: {
        type: String,
        required: [true, "Author Name is Required"],
      },
      publishDate: {
        type: Date,
        default: Date.now,
      },
      image: {
        type: String,
        required: true,
      },
    },
    thumbnail_url: {
      type: String,
      required: [true, "News Thubnail is required"],
    },
    details: {
      type: String,
      required: [true, "News Details is Required"],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
        required: true,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
  },

  {
    timestamps: true,
  }
);

const News = model("News", newsSchema);
module.exports = News;
