import { Router } from "express";
import { getDashboardData } from "../controllers/dashboardController";
import { authenticate } from "../middleware/auth";

export const dashboardRoutes = Router();

dashboardRoutes.get("/stats", authenticate, getDashboardData);
