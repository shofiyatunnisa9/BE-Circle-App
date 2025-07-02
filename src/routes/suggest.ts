import { Router } from "express";
import { suggestedFollowController } from "../controllers/suggested";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/suggest", authenticate, suggestedFollowController);

export default router;
