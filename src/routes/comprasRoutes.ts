// src/routes/saleRoutes.ts ✅
import { Router } from 'express';
import { createCompra, deleteCompra, listCompras } from '../controllers/comprasController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get("/", authenticateToken, listCompras); 
router.post('/', authenticateToken, createCompra);
router.delete('/', authenticateToken, deleteCompra);

export default router;
