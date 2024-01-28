require("dotenv").config();
const PORT = process.env.PORT;
const dbURL = process.env.dbURL;

module.exports = {
  PORT,
  dbURL,
};
