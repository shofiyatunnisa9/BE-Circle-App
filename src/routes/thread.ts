import { Router } from "express";
import { threadController } from "../controllers/thread";

const router = Router();

router.post("/post", threadController);

export default router;
