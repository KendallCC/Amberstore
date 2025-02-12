"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const CategoryRoute_1 = __importDefault(require("./prisma/Routes/CategoryRoute"));
const ProductRoute_1 = __importDefault(require("./prisma/Routes/ProductRoute"));
const ImagesRoute_1 = __importDefault(require("./prisma/Routes/ImagesRoute"));
const ProductCategoryRoute_1 = __importDefault(require("./prisma/Routes/ProductCategoryRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app); // Crear servidor HTTP para Socket.io
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://ambersdesings-production.up.railway.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});
exports.io = io;
app.use(express_1.default.json());
const allowedOrigins = [
    'http://localhost:5173',
    'https://ambersdesings-production.up.railway.app',
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Configuración de rutas
app.use('/api/categorias', CategoryRoute_1.default);
app.use('/api/productos', ProductRoute_1.default);
app.use('/api/imagenes', ImagesRoute_1.default);
app.use('/api/productoCategorias', ProductCategoryRoute_1.default);
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
