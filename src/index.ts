import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/database";
import indexRoutes from './routes/index';
import morgan from 'morgan';
import path from "path"; 

dotenv.config();

const app = express();
app.use(morgan('dev')); // Middleware para registrar las peticiones HTTP
app.use(cors());
app.use(express.json());

// 👇 Servir la carpeta uploads de forma estática
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Agrupador de rutas
app.use('/api', indexRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Base de datos conectada");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => console.error("❌ Error al conectar BD:", err));
