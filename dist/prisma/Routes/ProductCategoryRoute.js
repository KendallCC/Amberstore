"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productCategory_1 = require("../Controllers/productCategory");
const router = (0, express_1.Router)();
router.get('/', productCategory_1.createProductCategory);
router.post('/', productCategory_1.getProductCategory);
exports.default = router;
