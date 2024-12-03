import { config } from "../config/config";
import { APIError } from "./errorHandler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headerToken = req.headers.authorization?.split(" ")[1];
    const cookieToken = req.cookies?.auth_token;
    const token = headerToken || cookieToken;

    if (!token) {
      throw new APIError(401, "No authentication token provided");
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = decoded;
      next();
    } catch (jwtError) {
      throw new APIError(401, "Invalid or expired token");
    }
  } catch (error) {
    next(error);
  }
};
