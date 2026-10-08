import express from "express";
import authRoutes from "./src/routes/user.routes.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

//auth routes
app.use("/api/v1/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: true,
    message: "Hellow there",
  });
});

app.use(errorHandler);

export default app;
