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
exports.createProductCategory = exports.getProductCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const relaciones = yield prisma.productoCategoria.findMany();
    res.json(relaciones);
});
exports.getProductCategory = getProductCategory;
const createProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productoId, categoriaId } = req.body;
    const relacion = yield prisma.productoCategoria.create({
        data: { productoId, categoriaId },
    });
    res.json(relacion);
});
exports.createProductCategory = createProductCategory;
