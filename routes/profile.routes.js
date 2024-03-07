const {
  createProfileInformation,
  updateProfileInformation,
  getUserProfileSingleInformation,
  getAllUserPrfoile,
  createVerifyUserProfile,
  deleteUserProfile,
} = require("../controllers/profile.controller");

const profileRouter = require("express").Router();

profileRouter.post("/", createProfileInformation);
profileRouter.put("/update/:email", updateProfileInformation);
profileRouter.patch("/update-verification/:email", createVerifyUserProfile);
profileRouter.get(
  "/single-user-profile/:email",
  getUserProfileSingleInformation
);
profileRouter.get("/", getAllUserPrfoile);
profileRouter.delete("/:id", deleteUserProfile);

module.exports = profileRouter;
