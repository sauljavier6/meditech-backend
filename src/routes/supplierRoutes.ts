// src/routes/saleRoutes.ts ✅
import { Router } from 'express';
import { createSupplier, deleteSuppliers, getSupplierById, getSuppliers, updateUser, searchSupplier } from '../controllers/supplierController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createSupplier);
router.get('/', authenticateToken, getSuppliers);
router.get("/search", authenticateToken, searchSupplier);
router.get('/:id', authenticateToken, getSupplierById);
router.delete('/', authenticateToken, deleteSuppliers);
router.put('/', authenticateToken, updateUser);



export default router;
