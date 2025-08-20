// @/routes/payment.routes.ts
import { Router } from "express";
import { getPayments } from "../controllers/paymentController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getPayments);

export default router;
