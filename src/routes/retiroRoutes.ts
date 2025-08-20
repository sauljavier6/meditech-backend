import { Router } from "express";
import { createRetiro } from "../controllers/retiroController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authenticateToken, createRetiro);

export default router;
