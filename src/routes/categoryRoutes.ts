// src/routes/rolRoutes.ts
import { Router } from 'express';
import { postCategory, getCategories } from '../controllers/categoryController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

//router.get('/', getEmail);
router.post('/', authenticateToken, postCategory);
router.get('/', getCategories);

export default router;