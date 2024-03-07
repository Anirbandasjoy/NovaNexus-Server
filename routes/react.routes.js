const {
  handleCreateReact,
  handlegetReact,
  handleGetNewsReact,
} = require("../controllers/react.controller");

const reactRouter = require("express").Router();

reactRouter.post("/", handleCreateReact);
reactRouter.get("/", handlegetReact);
reactRouter.get("/news", handleGetNewsReact);

module.exports = reactRouter;
