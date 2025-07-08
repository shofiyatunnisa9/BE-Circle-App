import { Router } from "express";
import { repliesAllController, repliesController } from "../controllers/reply";
import { authenticate } from "../middleware/auth";
import { upload } from "../middleware/multer";

const router = Router();

router.post("/reply", authenticate, upload.single("images"), repliesController);
router.get("/reply/:id", repliesAllController);
export default router;
