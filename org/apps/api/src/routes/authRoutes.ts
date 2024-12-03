import { Router } from "express";
import { authController } from "../controllers/authController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify", authenticate, authController.verify);
router.post("/logout", authController.logout);

export const authRoutes = router;
