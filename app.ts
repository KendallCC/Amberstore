import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import categoryRoutes from './prisma/Routes/CategoryRoute';
import productsRoutes from './prisma/Routes/ProductRoute';
import imagenesRoutes from './prisma/Routes/ImagesRoute';
import productoCategoriasRoutes from './prisma/Routes/ProductCategoryRoute';

dotenv.config();

const app: Application = express();
const server = createServer(app); // Crear servidor HTTP para Socket.io
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://ambersdesings-production.up.railway.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://ambersdesings-production.up.railway.app',
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Configuración de rutas
app.use('/api/categorias', categoryRoutes);
app.use('/api/productos', productsRoutes);
app.use('/api/imagenes', imagenesRoutes);
app.use('/api/productoCategorias', productoCategoriasRoutes);

// En app.ts (o el archivo donde configuras Socket.io)
io.on("connection", (socket) => {
  // console.log("Usuario conectado:", socket.id, socket.handshake.query);

  // Verificamos la ruta enviada en el query
  const { page } = socket.handshake.query;
  if (page === "/producto/table") {
    // Solo los clientes que estén en la URL /producto/table se unen a esta sala
    socket.join("producto_table");
    // console.log(`Socket ${socket.id} se unió a la sala producto_table`);
  }

  // socket.on("disconnect", () => {
  //   console.log("Usuario desconectado:", socket.id);
  // });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { io };
