import { Router } from "express";
import {
  editProfileController,
  getMediaByUsernameController,
  getMediaController,
  getProfileController,
  getThreadProfileByUsernameController,
  getUserThreadController,
  profileUsersController,
} from "../controllers/profile";
import { authenticate } from "../middleware/auth";
import { upload } from "../middleware/multer";

const route = Router();

route.get("/profile", authenticate, getProfileController);
route.patch(
  "/profiles",
  authenticate,
  upload.fields([{ name: "avatar" }, { name: "banner" }]),
  editProfileController
);
route.get("/profile-home", authenticate, getUserThreadController);
route.get("/profile/:username", authenticate, profileUsersController);
route.get(
  "/profile/:username/threads",
  authenticate,
  getThreadProfileByUsernameController
);
route.get("/media", authenticate, getMediaController);
route.get(
  "/profile/:username/media",
  authenticate,
  getMediaByUsernameController
);

export default route;
