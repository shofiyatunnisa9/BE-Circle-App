import cors from "cors";

const corsMiddleware = cors({
  origin: ["http://localhost:5173", "https://circle-app-fe-roan.vercel.app"],
  credentials: true,
});

export default corsMiddleware;
