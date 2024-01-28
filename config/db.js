const mongoose = require("mongoose");
const { dbURL } = require("../secret");

mongoose
  .connect(dbURL)
  .then(() => console.log("db is connected successsfully"))
  .catch((err) => console.log(err));
