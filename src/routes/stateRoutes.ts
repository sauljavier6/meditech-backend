// src/routes/state.routes.ts
import { Router } from 'express';
import { getStates } from '../controllers/stateController';

const router = Router();

router.get('/', getStates);

export default router;
