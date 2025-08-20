// src/routes/state.routes.ts
import { Router } from 'express';
import { getStates } from '../controllers/stateController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getStates);

export default router;
