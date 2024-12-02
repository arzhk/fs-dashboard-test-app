import { Router } from "express";
import { getDashboardData } from "../controllers/dashboardController";

export const dashboardRoutes = Router();

dashboardRoutes.get("/stats", getDashboardData);
