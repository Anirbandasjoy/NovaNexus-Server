const express = require("express");
const categoryRouter = require("./routes/caregory.routes");
const app = express();
const cors = require("cors");
const newsCommentRouter = require("./routes/newsComment.routes");
require("./config/db");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/news-comments", newsCommentRouter);

app.get("/", (req, res) => {
  res.send("NovaNexus Server is running ...");
});

app.use((req, res, next) => {
  next(createError(404, "route not found"));
});

app.use((err, req, res, next) => {
  return errrorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});
module.exports = app;
