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
    rating: {
      number: {
        type: number,
        required: true,
      },
      badge: {
        type: String,
        required: true,
      },
    },
    //   total_view: {
    //     type: number,
    //     required: true,
    //   },
    title: {
      type: String,
      required: [true, "News Title is required"],
    },
    author: {
      name: {
        type: string,
        required: [true, "Author Name is Required"],
      },
      publishDate: {
        type: Date,
        default: Date.now,
      },
      img: {
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
  },

  {
    timestamps: true,
  }
);

const News = model("News", newsSchema);
module.exports = News;
