import { Router } from "express";
import {
  editProfileController,
  getProfileController,
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

export default route;
