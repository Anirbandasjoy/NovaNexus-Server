const {
  createProfileInformation,
} = require("../controllers/profile.controller");

const profileRouter = require("express").Router();

profileRouter.get("/", (req, res) => {
  res.send("Profile Router Is Activated");
});

profileRouter.post("/profile", createProfileInformation);

module.exports = profileRouter;
