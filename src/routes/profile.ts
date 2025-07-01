import { Router } from "express";
import {
  editProfileController,
  getProfileController,
  getUserThreadController,
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

export default route;
