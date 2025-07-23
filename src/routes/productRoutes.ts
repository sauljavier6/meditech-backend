// src/routes/rolRoutes.ts
import { Router } from 'express';
import { getProducts, postProducts, deleteproducts, getProductById, updateProduct } from '../controllers/ProductController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', postProducts);
router.delete('/', deleteproducts);
router.put('/', updateProduct);


export default router;