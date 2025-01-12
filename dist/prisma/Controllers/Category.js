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
exports.deleteCategoria = exports.updateCategoria = exports.createCategoria = exports.getCategorias = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todas los Categorias
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Categorias = yield prisma.categoria.findMany();
        res.json(Categorias);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorias', error });
    }
});
exports.getCategorias = getCategorias;
const createCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion } = req.body;
        const categoria = yield prisma.categoria.create({
            data: { nombre, descripcion },
        });
        res.json(categoria);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la categoria', error });
    }
});
exports.createCategoria = createCategoria;
// Actualizar una categoría
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // ID de la categoría a actualizar
        const { nombre, descripcion } = req.body;
        const categoria = yield prisma.categoria.update({
            where: { id: parseInt(id) }, // Convertir el ID a número
            data: { nombre, descripcion },
        });
        res.json(categoria);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar la categoría', error });
    }
});
exports.updateCategoria = updateCategoria;
// Eliminar una categoría
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // ID de la categoría a eliminar
        yield prisma.categoria.delete({
            where: { id: parseInt(id) }, // Convertir el ID a número
        });
        res.json({ message: 'Categoría eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar la categoría', error });
    }
});
exports.deleteCategoria = deleteCategoria;
