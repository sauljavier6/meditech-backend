// src/routes/rolRoutes.ts
import { Router } from 'express';
import { getEmail, getEmailbyId } from '../controllers/emailController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getEmail);
router.get('/:id', authenticateToken, getEmailbyId);

export default router;