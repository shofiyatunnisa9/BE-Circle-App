import { Router } from "express";
import { getProfileController } from "../controllers/profile";
import { authenticate } from "../middleware/auth";

const route = Router();

route.get("/profile", authenticate, getProfileController);

export default route;
