const express = require("express");
const categoryRouter = require("./routes/caregory.routes");
const app = express();
const createError = require("http-errors");
const cors = require("cors");
const newsCommentRouter = require("./routes/newsComment.routes");
const { errorResponse } = require("./helper/response");
const newsRouter = require("./routes/news.routes");
const bookmarkRouter = require("./routes/bookmark.routes");
const profileRouter = require("./routes/profile.routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/news-comments", newsCommentRouter);
app.use("/api/v1/news-bookmark", bookmarkRouter);
app.use("/api/v1/profile", profileRouter);

app.get("/", (req, res) => {
  res.send("NovaNexus Server is running ...");
});

app.use((req, res, next) => {
  next(createError(404, "route not found"));
});

app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});
module.exports = app;
