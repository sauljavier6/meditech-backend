// src/routes/saleRoutes.ts ✅
import { Router } from 'express';
import { getListSale, createSale, searchProducts, createCustomerSale } from '../controllers/saleController';

const router = Router();

router.get('/', getListSale);
router.get('/search', searchProducts);
router.post('/', createSale);
router.post('/customer', createCustomerSale);


export default router;
