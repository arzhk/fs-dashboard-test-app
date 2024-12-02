import { APIError } from '../middleware/errorHandler';
import { Request, Response, NextFunction } from 'express';

export const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new APIError(401, 'User not authenticated');
    }

    res.json({
      message: "Dashboard data fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};
