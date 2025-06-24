import { Router } from "express";
import { threadAllController, threadController, threadByIdController, deleteThreadController, updateThreadController } from "../controllers/thread";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/post", authenticate, threadController);
router.get("/threads", threadAllController);
router.get("/threads/:id", threadByIdController);
router.delete("/threads/:id", deleteThreadController);
router.put("/threads/:id", updateThreadController);

export default router;
