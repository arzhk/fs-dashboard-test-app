import { APIError } from "../middleware/errorHandler";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

export const userController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;

      if (!userId) {
        throw new APIError(400, "User ID is required");
      }

      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const updateData = req.body;

      if (!userId) {
        throw new APIError(400, "User ID is required");
      }

      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      }).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;

      if (!userId) {
        throw new APIError(400, "User ID is required");
      }

      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
