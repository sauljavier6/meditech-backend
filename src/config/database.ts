// src/config/database.ts
import { Sequelize } from 'sequelize-typescript';
import Rol  from '../models/Rol'; // importa tu modelo
import dotenv from 'dotenv';
import User from '../models/User';
import Email from '../models/Email';
import Product from '../models/Product';
import Stock from '../models/Stock';
import Category from '../models/Category';
import Sale from '../models/Sale';
import State from '../models/State';
import Payment from '../models/Payment';
import PaymentSale from '../models/PaymentSale';
import ProductSale from '../models/SaleProduct';
import Batch from '../models/Batch';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Rol, User, Email, Product, Stock, Category, Sale, State, Payment, PaymentSale, ProductSale, Batch], // ✅ registra los modelos aquí
  logging: false,
});

export default sequelize;
