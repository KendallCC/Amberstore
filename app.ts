import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importa cors

import categoryRoutes from './prisma/Routes/CategoryRoute';
import productsRoutes from './prisma/Routes/ProductRoute';
import imagenesRoutes from './prisma/Routes/ImagesRoute';
import productoCategoriasRoutes from './prisma/Routes/ProductCategoryRoute';

// Configuración de dotenv
dotenv.config();

const app: Application = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173', // Dominio en desarrollo
  'https://ambersdesings-production.up.railway.app', // Dominio en producción
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite solicitudes sin origen (por ejemplo, en herramientas como Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  })
);
// Configuración de rutas
app.use('/api/categorias', categoryRoutes);
app.use('/api/productos', productsRoutes);
app.use('/api/imagenes', imagenesRoutes);
app.use('/api/productoCategorias', productoCategoriasRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

