import { Router } from 'express';
import authRoutes from './authRoutes';
import rolRoutes from './rolRoutes';
import emailRoutes from './emailRoutes';
import productRoutes from './productRoutes';
import categoryRoutes from './categoryRoutes';
import saleRoutes from './saleRoutes';
import stateRoutes from './stateRoutes';
import paymentRoutes from './paymentRoutes';
import batchRoutes from './batchRoutes';

const router = Router();

// Prefijos para cada grupo de rutas
router.use('/auth', authRoutes);
router.use('/rol', rolRoutes);
router.use('/email', emailRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/sale', saleRoutes);
router.use('/state', stateRoutes);
router.use('/payment', paymentRoutes);
router.use('/batch', batchRoutes);

export default router;
