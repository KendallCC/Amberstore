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
exports.createImagen = exports.getImagenes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getImagenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imagenes = yield prisma.imagen.findMany();
    res.json(imagenes);
});
exports.getImagenes = getImagenes;
const createImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { urlImagen, productoId } = req.body;
    const imagen = yield prisma.imagen.create({
        data: { urlImagen, productoId },
    });
    res.json(imagen);
});
exports.createImagen = createImagen;
