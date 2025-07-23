// @/routes/payment.routes.ts
import { Router } from "express";
import { getPayments } from "../controllers/paymentController";

const router = Router();

router.get("/", getPayments); // GET /api/payment

export default router;
