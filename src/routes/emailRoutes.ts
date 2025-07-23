// src/routes/rolRoutes.ts
import { Router } from 'express';
import { getEmail, getEmailbyId } from '../controllers/emailController';

const router = Router();

router.get('/', getEmail);
router.get('/:id', getEmailbyId);

export default router;