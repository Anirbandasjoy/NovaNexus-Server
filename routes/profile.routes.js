const {
  createProfileInformation,
  updateProfileInformation,
  getUserProfileSingleInformation,
  getUserProfileInformationUsingUserId,
} = require("../controllers/profile.controller");

const profileRouter = require("express").Router();

profileRouter.post("/", createProfileInformation);
profileRouter.put("/update/:email", updateProfileInformation);
profileRouter.get(
  "/single-user-profile/:email",
  getUserProfileSingleInformation
);
profileRouter.get(
  "/user/single-user-profile/:id",
  getUserProfileInformationUsingUserId
);

module.exports = profileRouter;
