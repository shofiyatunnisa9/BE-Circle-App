import { Router } from "express";
import {
  getFollowingController,
  getFollowersController,
  getFollowCountsController,
  followController,
} from "../controllers/follow";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/toggle", authenticate, followController);
router.get("/following", authenticate, getFollowingController);
router.get("/followers", authenticate, getFollowersController);
router.get("/counts", authenticate, getFollowCountsController);

export default router;
