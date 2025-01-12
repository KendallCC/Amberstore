"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Importa cors
const CategoryRoute_1 = __importDefault(require("./prisma/Routes/CategoryRoute"));
const ProductRoute_1 = __importDefault(require("./prisma/Routes/ProductRoute"));
const ImagesRoute_1 = __importDefault(require("./prisma/Routes/ImagesRoute"));
const ProductCategoryRoute_1 = __importDefault(require("./prisma/Routes/ProductCategoryRoute"));
// Configuración de dotenv
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Dominio del cliente
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));
// Configuración de rutas
app.use('/api/categorias', CategoryRoute_1.default);
app.use('/api/productos', ProductRoute_1.default);
app.use('/api/imagenes', ImagesRoute_1.default);
app.use('/api/productoCategorias', ProductCategoryRoute_1.default);
// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
