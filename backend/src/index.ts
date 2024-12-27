import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import publicRoutes from "./routes/public";
import userRoutes from "./routes/user";
import { errorHandler } from "./middleware/auth";
import mongoose from "mongoose";
import serviceRoutes from "./routes/services";
import incidentRoutes from "./routes/incidents";
import dashboardRoutes from "./routes/dashboard";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: [
      "https://status-page-application-fe.vercel.app",
      "http://localhost:5173",
    ],
  })
);
app.use(express.json());

// Routes
app.use("/api/public", publicRoutes);
app.use("/api/user", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

// Base route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
