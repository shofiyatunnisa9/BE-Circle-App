import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRouter from "./src/routes/auth";
import threadRouter from "./src/routes/thread";
import corsMiddleware from "./src/configs/cors";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(corsMiddleware);
app.use("/api", authRouter);
app.use("/api", threadRouter);

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
