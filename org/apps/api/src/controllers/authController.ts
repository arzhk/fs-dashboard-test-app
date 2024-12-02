import { APIError } from '../middleware/errorHandler';
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { config } from "../config/config";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        throw new APIError(400, 'Email, password, and name are required');
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const user = await User.create({ email, password, name });
      const token = jwt.sign({ id: user._id }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new APIError(400, 'Email and password are required');
      }

      const user = await User.findOne({ email }).exec();

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      res.json({ token });
    } catch (error) {
      next(error);
    }
  },
};
