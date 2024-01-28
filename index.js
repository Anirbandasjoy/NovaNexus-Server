const app = require("./app");
const http = require("http");
const { PORT } = require("./secret");
const dbConnection = require("./config/db");
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
