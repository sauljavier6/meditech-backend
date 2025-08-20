// src/routes/rolRoutes.ts
import { Router } from 'express';
import { getProducts, postProducts, deleteproducts, getProductById, updateProduct } from '../controllers/ProductController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/upload';

const router = Router();

router.get('/', authenticateToken, getProducts);
router.get('/:id', authenticateToken, getProductById);
router.post("/", upload.array("Imagenes", 5), authenticateToken, postProducts);
router.delete('/', authenticateToken, deleteproducts);
router.put('/', authenticateToken, updateProduct);

export default router;