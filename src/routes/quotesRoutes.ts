// src/routes/saleRoutes.ts ✅
import { Router } from 'express';
import { createQuotes, getListQuotes, getQuotesById, updateQuotes } from '../controllers/quotesController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getListQuotes);
router.get("/:id", authenticateToken, getQuotesById);
router.post('/', authenticateToken, createQuotes);
router.put("/:id", authenticateToken, updateQuotes);

export default router;
