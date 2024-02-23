const {
  createProfileInformation,
  updateProfileInformation,
  getUserProfileSingleInformation,
} = require("../controllers/profile.controller");

const profileRouter = require("express").Router();

profileRouter.post("/", createProfileInformation);
profileRouter.put("/update/:email", updateProfileInformation);
profileRouter.get(
  "/single-user-profile/:email",
  getUserProfileSingleInformation
);

module.exports = profileRouter;
