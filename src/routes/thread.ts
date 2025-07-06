import { Router } from "express";
import {
  deleteThreadController,
  threadAllController,
  threadByIdController,
  threadController,
} from "../controllers/thread";
import { authenticate } from "../middleware/auth";
import { upload } from "../utils/multer";

const router = Router();

router.post("/post", authenticate, upload.single("images"), threadController);
router.get("/threads", authenticate, threadAllController);
router.get("/threads/:id", threadByIdController);
router.delete("/threads/:id", deleteThreadController);

export default router;
