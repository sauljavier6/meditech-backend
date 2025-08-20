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
import clientesRoutes from './clientesRoutes';
import ticketRoutes from './ticketRoutes';
import retiroRoutes from './retiroRoutes';
import quotesRoutes from './quotesRoutes';
import supplierRoutes from './supplierRoutes';
import comprasRoutes from './comprasRoutes';

import productERoutes from './ecommerceRoutes/productRoutes';

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
router.use('/clientes', clientesRoutes);
router.use('/ticket', ticketRoutes);
router.use('/retiro', retiroRoutes);
router.use('/quotes', quotesRoutes);
router.use('/supplier', supplierRoutes);
router.use('/compras', comprasRoutes);

//ecommerce routes
router.use('/ecommerce/products', productERoutes);

export default router;
