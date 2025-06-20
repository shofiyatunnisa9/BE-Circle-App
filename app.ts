import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth";
import corsMiddleware from "./src/configs/cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(corsMiddleware);
app.use("/api", authRouter);

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
