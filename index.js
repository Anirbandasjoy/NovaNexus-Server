require("dotenv").config();
const http = require("http");
const app = require("./app");
const dbConnection = require("./config/db");
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const main = async () => {
  try {
    await dbConnection();
    server.listen(PORT, async () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log("Database Error");
    console.log(e);
  }
};

main();
