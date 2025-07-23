// src/routes/rolRoutes.ts
import { Router } from 'express';
import { crearRol, getRoles } from '../controllers/rolController';

const router = Router();

router.get('/', getRoles);
router.post('/', crearRol);

export default router;