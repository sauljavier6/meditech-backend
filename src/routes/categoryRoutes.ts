// src/routes/rolRoutes.ts
import { Router } from 'express';
import { postCategory, getCategories } from '../controllers/categoryController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

//router.get('/', getEmail);
router.post('/', postCategory);
router.get('/', authenticateToken, getCategories);

export default router;