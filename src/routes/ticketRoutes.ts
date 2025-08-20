// src/routes/saleRoutes.ts
import { Router } from "express";
import { printTicket, sendTicketByEmail } from "../controllers/ticketController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/:id", authenticateToken, printTicket);
router.post("/:id", authenticateToken, sendTicketByEmail);


export default router;
