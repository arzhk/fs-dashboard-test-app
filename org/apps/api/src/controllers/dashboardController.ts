import { APIError } from "../middleware/errorHandler";
import { Request, Response, NextFunction } from "express";

export const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dashboardData = {
      stats: {
        totalUsers: 1234,
        revenue: 12345,
        orders: 567,
        activeSessions: 89,
      },
      revenueChart: [
        { name: "Jan", value: 400 },
        { name: "Feb", value: 300 },
        { name: "Mar", value: 600 },
        { name: "Apr", value: 800 },
        { name: "May", value: 500 },
      ],
      recentActivities: [
        { id: 1, description: "New user registration" },
        { id: 2, description: "Order #1234 placed" },
        { id: 3, description: "Payment received" },
        { id: 4, description: "New product added" },
      ],
      quickStats: {
        conversionRate: 2.4,
        avgOrderValue: 156,
      },
    };

    res.json({ success: true, data: dashboardData });
  } catch (error) {
    next(error);
  }
};
