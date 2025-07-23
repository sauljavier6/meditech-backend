// src/routes/rolRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { postBatch, getBatch } from '../controllers/BatchController';

const router = Router();

//router.get('/', getEmail);
router.post('/', authenticateToken, postBatch);
router.get('/', authenticateToken, getBatch);

export default router;