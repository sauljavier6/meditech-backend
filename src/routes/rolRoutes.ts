// src/routes/rolRoutes.ts
import { Router } from 'express';
import { crearRol, getRoles } from '../controllers/rolController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getRoles);
router.post('/', authenticateToken, crearRol);

export default router;