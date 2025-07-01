import { Router } from "express";
import { searchController } from "../controllers/search";

const router = Router();

router.get("/search", searchController);

export default router;
