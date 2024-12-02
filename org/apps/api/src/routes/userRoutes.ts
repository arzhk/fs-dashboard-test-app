import { Router } from "express";
import { userController } from "../controllers/userController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export const userRoutes = router;
