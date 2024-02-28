const {
  createProfileInformation,
  updateProfileInformation,
  getUserProfileSingleInformation,
  getAllUserPrfoile,
} = require("../controllers/profile.controller");

const profileRouter = require("express").Router();

profileRouter.post("/", createProfileInformation);
profileRouter.put("/update/:email", updateProfileInformation);
profileRouter.get(
  "/single-user-profile/:email",
  getUserProfileSingleInformation
);
profileRouter.get("/", getAllUserPrfoile);

module.exports = profileRouter;
