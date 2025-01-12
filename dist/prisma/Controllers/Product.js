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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductsbyCategory = exports.getProductById = exports.getProducts = void 0;
// controllers/productosController.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield prisma.producto.findMany({
            include: {
                imagenes: true, // Incluye todas las imágenes asociadas al producto
                categorias: {
                    include: {
                        categoria: true, // Incluye los detalles de cada categoría asociada
                    },
                },
            },
        });
        res.json(productos);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Validar que el ID es un número válido
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "El ID del producto es inválido" });
        }
        const producto = yield prisma.producto.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                imagenes: true, // Incluye todas las imágenes asociadas al producto
                categorias: {
                    include: {
                        categoria: true, // Incluye los detalles de cada categoría asociada
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
        // Validar que el ID de la categoría es un número
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
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion, precio, imagenes, categorias } = req.body;
        // Mapear las imágenes para asegurarte de que solo envías el campo `urlImagen`
        const imagenesLimpias = imagenes.map((imagen) => ({
            urlImagen: imagen.urlImagen,
        }));
        const producto = yield prisma.producto.create({
            data: {
                nombre,
                descripcion,
                precio,
                imagenes: {
                    create: imagenesLimpias, // Crear imágenes relacionadas
                },
                categorias: {
                    create: categorias.map((categoria) => ({
                        categoria: {
                            connect: { id: categoria.categoriaId }, // Conectar categoría existente
                        },
                    })),
                },
            },
            include: {
                imagenes: true,
                categorias: true, // Incluir las relaciones en la respuesta
            },
        });
        res.json(producto);
    }
    catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, descripcion, precio, imagenes, categorias } = req.body;
    try {
        // Validar que el ID es un número válido
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "El ID del producto es inválido" });
        }
        // Actualizar el producto
        // Actualizar el producto
        const productoActualizado = yield prisma.producto.update({
            where: { id: parseInt(id, 10) },
            data: {
                nombre,
                descripcion,
                precio,
                imagenes: {
                    deleteMany: {}, // Eliminar todas las imágenes relacionadas
                    create: imagenes.map((imagen) => ({
                        urlImagen: imagen.urlImagen, // Solo incluir campos relevantes
                    })),
                },
                categorias: {
                    deleteMany: {}, // Eliminar todas las categorías relacionadas
                    create: categorias.map((categoria) => ({
                        categoria: {
                            connect: { id: categoria.categoriaId }, // Conectar a una categoría existente
                        },
                    })),
                },
            },
            include: {
                imagenes: true,
                categorias: true,
            },
        });
        res.json(productoActualizado);
    }
    catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Validar que el ID es un número válido
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "El ID del producto es inválido" });
        }
        // Verificar si el producto existe antes de eliminarlo
        const productoExistente = yield prisma.producto.findUnique({
            where: { id: parseInt(id, 10) },
        });
        if (!productoExistente) {
            res.status(404).json({ message: "Producto no encontrado" });
        }
        // Eliminar el producto
        yield prisma.producto.delete({
            where: { id: parseInt(id, 10) },
        });
        res.json({ message: "Producto eliminado exitosamente" });
    }
    catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
});
exports.deleteProduct = deleteProduct;
