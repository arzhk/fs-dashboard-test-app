import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { dashboardRoutes } from "./routes/dashboardRoutes";
import { errorHandler } from "./middleware/errorHandler";
import * as dotenv from "dotenv";
import { resolve } from "path";
import cookieParser from "cookie-parser";

dotenv.config({ path: resolve(__dirname, "../../../.env") });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:4200", "http://localhost:4201"],
    credentials: true,
  })
);

connectDatabase()
  .then(() => console.log("Database initialized"))
  .catch((error) => console.error("Database initialization error:", error));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(errorHandler);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on("request", (req) => {
  console.log(`api request: ${req.method} ${req.url} ${req.headers.authorization}`);
});
server.on("error", console.error);

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});
