import { Router } from "express";
import {
  forgotController,
  loginController,
  registerController,
  resetController,
} from "../controllers/auth";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot", forgotController);
router.patch("/reset/:token", resetController);

export default router;
