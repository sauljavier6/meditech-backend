// src/routes/rolRoutes.ts
import { Router } from 'express';
import { getProducts, getProductById} from '../../controllers/ecommerceControllers/productController';
import { authenticateToken } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getProducts);
router.get('/:id', authenticateToken, getProductById);
/*router.post("/", upload.array("Imagenes", 5), authenticateToken, postProducts);
router.delete('/', authenticateToken, deleteproducts);
router.put('/', authenticateToken, updateProduct);*/

export default router;