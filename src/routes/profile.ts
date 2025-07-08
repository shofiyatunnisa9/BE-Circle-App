import { Router } from "express";
import {
  editProfileController,
  getMediaController,
  getProfileController,
  getThreadProfileByUsernameController,
  getUserThreadController,
  profileUsersController,
} from "../controllers/profile";
import { authenticate } from "../middleware/auth";
import { uploadProfileImage } from "../utils/multer";

const route = Router();

route.get("/profile", authenticate, getProfileController);
route.patch(
  "/profiles",
  authenticate,
  uploadProfileImage,
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

export default route;
