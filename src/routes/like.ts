import { Router } from "express";
import { likeController } from "../controllers/like";
import { authenticate } from "../middleware/auth";

const route = Router();

route.post("/like", authenticate, likeController);

export default route;
