"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Images_1 = require("../Controllers/Images");
const router = (0, express_1.Router)();
router.get('/', Images_1.getImagenes);
router.post('/', Images_1.createImagen);
exports.default = router;
