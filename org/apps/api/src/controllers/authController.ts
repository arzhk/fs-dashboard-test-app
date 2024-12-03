import { APIError } from "../middleware/errorHandler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { config } from "../config/config";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        throw new APIError(400, "Email, password, and name are required");
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      await User.create({ email, password, name });
      res.status(201).json({ success: true, message: "Registered successfully" });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new APIError(400, "Email and password are required");
      }

      const user = await User.findOne({ email }).exec();

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      delete user.password;

      res.status(200).json({ success: true, message: "Logged in successfully", user: user });
    } catch (error) {
      next(error);
    }
  },

  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.user.id).select("-password").exec();

      if (!user) {
        throw new APIError(404, "User not found");
      }

      res.status(200).json({
        success: true,
        message: "Token is valid",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        domain: process.env.COOKIE_DOMAIN || undefined,
      });

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
