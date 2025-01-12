"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Category_1 = require("../Controllers/Category");
const Categoryrouter = (0, express_1.Router)();
Categoryrouter.get('/', Category_1.getCategorias);
Categoryrouter.post('/', Category_1.createCategoria);
Categoryrouter.put('/:id', Category_1.updateCategoria); // Ruta para actualizar
Categoryrouter.delete('/:id', Category_1.deleteCategoria); // Ruta para eliminar
exports.default = Categoryrouter;
