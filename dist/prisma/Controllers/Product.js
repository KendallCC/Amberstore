"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getPaginatedProductsByCategory = exports.getProductsbyCategory = exports.getProductById = exports.getProductsPaginated = exports.getProducts = void 0;
// controllers/productosController.ts
const client_1 = require("@prisma/client");
const app_1 = require("../../app");
const prisma = new client_1.PrismaClient();
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, search = "", categoriaId } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const searchQuery = search.toString();
    try {
        // Generar las condiciones dinámicas para el filtro
        const whereClause = {
            OR: [
                { nombre: { contains: searchQuery } },
                { codigo: { contains: searchQuery } },
            ],
        };
        if (categoriaId) {
            whereClause.categorias = {
                some: { categoriaId: parseInt(categoriaId, 10) },
            };
        }
        // Obtener los productos con paginación y búsqueda
        const productos = yield prisma.producto.findMany({
            where: whereClause,
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
            include: {
                imagenes: true,
                categorias: {
                    include: { categoria: true },
                },
            },
        });
        // Contar el total de productos
        const totalProductos = yield prisma.producto.count({ where: whereClause });
        res.json({
            productos,
            totalProductos,
            totalPages: Math.ceil(totalProductos / limitNumber),
        });
    }
    catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error al obtener productos", error });
    }
});
exports.getProducts = getProducts;
const getProductsPaginated = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 8 } = req.query; // Parámetros de paginación con valores por defecto
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    try {
        // Obtener los productos con paginación
        const productos = yield prisma.producto.findMany({
            skip: (pageNumber - 1) * limitNumber, // Saltar registros según la página actual
            take: limitNumber, // Número de registros a devolver
            include: {
                imagenes: true, // Incluye imágenes asociadas
                categorias: {
                    include: {
                        categoria: true, // Incluye detalles de las categorías asociadas
                    },
                },
            },
        });
        // Contar el total de productos
        const totalProductos = yield prisma.producto.count();
        res.json({
            productos, // Productos de la página actual
            totalProductos, // Total de productos en la base de datos
            totalPages: Math.ceil(totalProductos / limitNumber), // Número total de páginas
        });
    }
    catch (error) {
        console.error("Error al obtener productos paginados:", error);
        res.status(500).json({ message: "Error al obtener productos paginados", error });
    }
});
exports.getProductsPaginated = getProductsPaginated;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "El ID del producto es inválido" });
        }
        const producto = yield prisma.producto.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                imagenes: true,
                categorias: {
                    include: {
                        categoria: true,
                    },
                },
            },
        });
        if (!producto) {
            res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(producto);
    }
    catch (error) {
        console.error("Error al obtener el producto por ID:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
});
exports.getProductById = getProductById;
const getProductsbyCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoriaId } = req.params;
    try {
        if (!categoriaId || isNaN(Number(categoriaId))) {
            res.status(400).json({ message: "El ID de la categoría es inválido" });
        }
        const productos = yield prisma.producto.findMany({
            where: {
                categorias: {
                    some: {
                        categoriaId: parseInt(categoriaId, 10),
                    },
                },
            },
            include: {
                categorias: {
                    include: { categoria: true },
                },
                imagenes: true,
            },
        });
        if (productos.length === 0) {
            res.status(404).json({ message: "No se encontraron productos para esta categoría" });
        }
        res.json(productos);
    }
    catch (error) {
        console.error("Error al obtener productos por categoría:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getProductsbyCategory = getProductsbyCategory;
const getPaginatedProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoriaId } = req.params;
    const { page = 1, limit = 8 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    try {
        if (!categoriaId || isNaN(Number(categoriaId))) {
            res.status(400).json({ message: "El ID de la categoría es inválido" });
        }
        // Obtener productos con paginación
        const productos = yield prisma.producto.findMany({
            where: {
                categorias: {
                    some: { categoriaId: parseInt(categoriaId, 10) },
                },
            },
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
            include: {
                imagenes: true,
                categorias: { include: { categoria: true } },
            },
        });
        // Contar el total de productos para esa categoría
        const totalProductos = yield prisma.producto.count({
            where: {
                categorias: {
                    some: { categoriaId: parseInt(categoriaId, 10) },
                },
            },
        });
        res.json({
            productos,
            totalProductos,
            totalPages: Math.ceil(totalProductos / limitNumber),
        });
    }
    catch (error) {
        console.error("Error al obtener productos por categoría paginados:", error);
        res.status(500).json({ message: "Error al obtener productos paginados", error });
    }
});
exports.getPaginatedProductsByCategory = getPaginatedProductsByCategory;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion, precio, codigo, imagenes, categorias, socketId } = req.body;
        const producto = yield prisma.producto.create({
            data: {
                nombre,
                descripcion,
                precio,
                codigo,
                imagenes: { create: imagenes.map((img) => ({ urlImagen: img.urlImagen })) },
                categorias: {
                    create: categorias.map((cat) => ({
                        categoria: { connect: { id: cat.categoriaId } },
                    })),
                },
            },
            include: { imagenes: true, categorias: { include: { categoria: true } } },
        });
        // console.log(`Nuevo producto creado: ${producto.nombre}`);
        if (socketId) {
            // Enviar confirmación solo al emisor
            app_1.io.to(socketId).emit("producto_creado_confirmacion", producto);
            const senderSocket = app_1.io.sockets.sockets.get(socketId);
            if (senderSocket) {
                // Usamos broadcast para enviar el evento a TODOS en la sala "producto_table" EXCEPTO al emisor
                senderSocket.broadcast.to("producto_table").emit("producto_creado", producto);
            }
            else {
                app_1.io.to("producto_table").emit("producto_creado", producto);
            }
        }
        else {
            app_1.io.to("producto_table").emit("producto_creado", producto);
        }
        res.json(producto);
    }
    catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: "Error al crear producto", error });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, descripcion, precio, codigo, imagenes, categorias, socketId } = req.body;
    try {
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "El ID del producto es inválido" });
        }
        const productoActualizado = yield prisma.producto.update({
            where: { id: parseInt(id, 10) },
            data: {
                nombre,
                descripcion,
                precio,
                codigo,
                imagenes: {
                    deleteMany: {},
                    create: imagenes.map((img) => ({ urlImagen: img.urlImagen })),
                },
                categorias: {
                    deleteMany: {},
                    create: categorias.map((cat) => ({
                        categoria: { connect: { id: cat.categoriaId } },
                    })),
                },
            },
            include: { imagenes: true, categorias: { include: { categoria: true } } },
        });
        // console.log(`✅ Producto actualizado: ${productoActualizado.nombre}`);
        // Enviar confirmación al emisor
        if (socketId) {
            app_1.io.to(socketId).emit("producto_actualizado_confirmacion", {
                id: productoActualizado.id,
                producto: productoActualizado,
            });
            // Obtener el socket del emisor y emitir a la sala "producto_table" a los demás
            const senderSocket = app_1.io.sockets.sockets.get(socketId);
            if (senderSocket) {
                senderSocket.broadcast.to("producto_table").emit("producto_actualizado", {
                    id: productoActualizado.id,
                    producto: productoActualizado,
                });
            }
            else {
                app_1.io.to("producto_table").emit("producto_actualizado", {
                    id: productoActualizado.id,
                    producto: productoActualizado,
                });
            }
        }
        else {
            app_1.io.to("producto_table").emit("producto_actualizado", {
                id: productoActualizado.id,
                producto: productoActualizado,
            });
        }
        res.json(productoActualizado);
    }
    catch (error) {
        // console.error("❌ Error al actualizar el producto:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { socketId } = req.body;
    try {
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "El ID del producto es inválido" });
        }
        const productoExistente = yield prisma.producto.findUnique({
            where: { id: parseInt(id, 10) },
        });
        if (!productoExistente) {
            res.status(404).json({ message: "Producto no encontrado" });
        }
        yield prisma.producto.delete({
            where: { id: parseInt(id, 10) },
        });
        // console.log(`🗑️ Producto eliminado: ${productoExistente.nombre}`);
        // Enviar confirmación solo al emisor y notificar a los demás en la sala "producto_table"
        if (socketId) {
            app_1.io.to(socketId).emit("producto_eliminado_confirmacion", { id: parseInt(id, 10) });
            const senderSocket = app_1.io.sockets.sockets.get(socketId);
            if (senderSocket) {
                senderSocket.broadcast.to("producto_table").emit("producto_eliminado", { id: parseInt(id, 10) });
            }
            else {
                app_1.io.to("producto_table").emit("producto_eliminado", { id: parseInt(id, 10) });
            }
        }
        else {
            app_1.io.to("producto_table").emit("producto_eliminado", { id: parseInt(id, 10) });
        }
        res.json({ message: "Producto eliminado exitosamente" });
    }
    catch (error) {
        console.error("❌ Error al eliminar el producto:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
});
exports.deleteProduct = deleteProduct;
