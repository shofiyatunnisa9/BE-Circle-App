import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRouter from "./src/routes/auth";
import threadRouter from "./src/routes/thread";
import profileRouter from "./src/routes/profile";
import searchRouter from "./src/routes/search";
import suggestRouter from "./src/routes/suggest";
import likeRouter from "./src/routes/like";
import repliesRouter from "./src/routes/reply";
import corsMiddleware from "./src/configs/cors";
import path from "path";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(corsMiddleware);
app.use("/api", authRouter);
app.use("/api", threadRouter);
app.use("/api", profileRouter);
app.use("/api", searchRouter);
app.use("/api", suggestRouter);
app.use("/api", likeRouter);
app.use("/api", repliesRouter);
const uploadPath = path.join(__dirname, "src", "uploads");
app.use("/uploads", express.static(uploadPath));
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
