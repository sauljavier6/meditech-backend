// src/routes/saleRoutes.ts ✅
import { Router } from 'express';
import { getListSale, createSale, searchProducts, createCustomerSale, UpdateCustomerSale, getSaleById, postCustomerSale, createPaymentSale } from '../controllers/saleController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getListSale);
router.post('/', authenticateToken, createSale);
router.get("/sale/:ID_Sale", authenticateToken, getSaleById);
router.get('/search', authenticateToken, searchProducts);
router.post('/customer', authenticateToken, createCustomerSale);
router.put('/customer', authenticateToken, UpdateCustomerSale);   
router.post('/customerwithsale', authenticateToken, postCustomerSale);
router.post('/payments', authenticateToken, createPaymentSale);

export default router;
