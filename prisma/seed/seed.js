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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var categorias, productos, imagenes, productoCategorias;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categorias = [
                        { id: 1, nombre: "Bolsos", descripcion: "Estilizados y funcionales, ideales para complementar tu look diario." },
                        { id: 2, nombre: "Mochilas colegiales y universitarias", descripcion: "Cómodas y resistentes, perfectas para estudiantes." },
                        { id: 3, nombre: "Mochilas viajeras", descripcion: "Amplias y prácticas, diseñadas para tus aventuras." },
                        { id: 4, nombre: "Aretes", descripcion: "Ligeros y únicos, hechos a mano para cada ocasión." },
                        { id: 5, nombre: "Acero inoxidable", descripcion: "Duraderos y elegantes, perfectos para uso diario." },
                        { id: 6, nombre: "Collares", descripcion: "Diseños únicos que resaltan tu estilo." },
                        { id: 7, nombre: "Pulseras", descripcion: "Coloridas y versátiles, hechas a mano con amor." },
                        { id: 8, nombre: "Llaveros", descripcion: "Funcionales y originales, con detalles únicos." },
                        { id: 9, nombre: "Carteras", descripcion: "Compactas y prácticas, perfectas para organizarte." },
                        { id: 10, nombre: "Salidas de Playa", descripcion: "Frescas y cómodas, ideales para el verano." },
                        { id: 11, nombre: "Relojes de Mujer", descripcion: "Elegantes y modernos, diseñados para destacar tu estilo con funcionalidad." },
                    ];
                    return [4 /*yield*/, prisma.categoria.createMany({ data: categorias, skipDuplicates: true })];
                case 1:
                    _a.sent();
                    productos = [
                        { id: 1, nombre: "Bolso Cruzado", descripcion: "Bolso compacto y elegante, con materiales tejidos, detalles en cuero sintético y cierre dorado. Ideal para cualquier ocasión.", precio: 17800 },
                        { id: 2, nombre: "Bolso Cruzado", descripcion: "Bolso moderno y práctico, con diseño tejido y detalles en cuero sintético. Incluye correa ajustable y monedero a juego. Perfecto para un look casual y funcional.", precio: 13800 },
                        { id: 3, nombre: "Bolso Cruzado", descripcion: "Bolso elegante y minimalista con acabado texturizado, detalle de cadena dorada y diseño moderno. Perfecto para un estilo sofisticado y versátil.", precio: 19600 },
                        { id: 4, nombre: "Bolso Cruzado", descripcion: "Bolso moderno en tono vibrante con diseño texturizado, correa ajustable y monedero a juego. Ideal para un look casual y colorido", precio: 13800 },
                        { id: 5, nombre: "Bolso Cruzado", descripcion: "Bolso sofisticado en tono oscuro con detalle de hebilla, correa ajustable y monedero a juego. Perfecto para un look elegante y funcional.", precio: 19600 },
                    ];
                    return [4 /*yield*/, prisma.producto.createMany({ data: productos, skipDuplicates: true })];
                case 2:
                    _a.sent();
                    imagenes = [
                        { id: 1, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642326/201c3280-0ece-4515-a12d-21e7f6ca3dd6.png", productoId: 1 },
                        { id: 2, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642317/5e29f4f5-8872-4591-b167-04a8c1a8cf77.png", productoId: 1 },
                        { id: 3, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642309/b5763a82-268c-4acc-9560-69cd1249b750.png", productoId: 1 },
                        { id: 4, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642304/392311bf-9f43-4715-b917-26c7ad29bcef.png", productoId: 1 },
                        { id: 5, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642294/672ccd54-2141-4b95-ada8-57b4fc2f7572.png", productoId: 1 },
                        { id: 6, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642282/b79970d7-32d6-4cd0-9fba-b45762bc2f72.png", productoId: 1 },
                        { id: 7, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642264/8ab01481-628d-4f74-89f0-752e8b08c061.png", productoId: 1 },
                        { id: 8, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642915/c0b26df5-7905-423a-b5f5-ed8a9c9ee591.png", productoId: 2 },
                        { id: 9, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642905/2a663d44-0434-4359-b3bd-23bc09050630.png", productoId: 2 },
                        { id: 10, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642893/83d30a23-8e3b-42c4-bc2b-29b17d966213.png", productoId: 2 },
                        { id: 11, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642885/2b53c2fc-44f9-40c2-9af4-73a3f862ead0.png", productoId: 2 },
                        { id: 12, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642879/f7dd9f2f-94a5-4c98-9585-3c3701393664.png", productoId: 2 },
                        { id: 13, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736642866/beb81ee1-79ba-47c9-a16a-095b246b0c20.png", productoId: 2 },
                        { id: 14, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644092/8a0d3de2-cb2c-418d-a25c-37eb765b434a.png", productoId: 3 },
                        { id: 15, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644084/14077c85-176b-4405-99ac-b9bc0cea69ef.png", productoId: 3 },
                        { id: 16, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644079/294259be-a2ee-4781-a93c-ea8d7cc23632.png", productoId: 3 },
                        { id: 17, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644073/f5054c24-0597-42a2-8c14-8083e998c3ad.png", productoId: 3 },
                        { id: 18, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644066/9a0ddd09-4ce1-4f1d-b2ed-bf7e186c4eda.png", productoId: 3 },
                        { id: 19, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644059/cd2f0cd4-0e5a-4b94-91fe-d5870f09d6f2.png", productoId: 3 },
                        { id: 20, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644046/aaecb885-1083-419c-931f-d40e57af4ded.png", productoId: 3 },
                        { id: 21, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644382/fe942981-496f-4002-b0b4-ed577dba4189.png", productoId: 4 },
                        { id: 22, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644374/d6b913d4-661f-4d90-a3c1-3b2c71ee8fe4.png", productoId: 4 },
                        { id: 23, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644368/815709de-64b4-415c-a986-da739aab9840.png", productoId: 4 },
                        { id: 24, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644361/ee64e209-c17b-416b-bdfb-514ec50e53d4.png", productoId: 4 },
                        { id: 25, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644355/36516238-cf29-49d3-b259-096306d7de70.png", productoId: 4 },
                        { id: 26, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644348/81e0c9b6-3870-4989-9bea-0ca2fb7e6eae.png", productoId: 4 },
                        { id: 27, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644341/e2d0081a-4677-4dde-91d3-70b6d444ed25.png", productoId: 4 },
                        { id: 28, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644333/bcaf9bb9-f5e9-4f6f-871a-0f0741438426.png", productoId: 4 },
                        { id: 29, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644326/a1a7c9ba-70ca-4e2e-a3df-61ee88f40aff.png", productoId: 4 },
                        { id: 30, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644319/a8ac73b9-4808-4aa2-838f-5456650c144e.png", productoId: 4 },
                        { id: 31, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644319/a8ac73b9-4808-4aa2-838f-5456650c144e.png", productoId: 4 },
                        { id: 32, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644294/cbd4881b-e0d5-4d88-9251-dbb08e099256.png", productoId: 4 },
                        { id: 33, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644733/99fc22bc-9f08-44e8-bfc7-2f9b0415f902.png", productoId: 5 },
                        { id: 34, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644717/9b8f22c0-f063-41e6-8ab9-0b7f64325073.png", productoId: 5 },
                        { id: 35, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644706/84422e0a-3934-47c1-a0ba-00b0c32bbac5.png", productoId: 5 },
                        { id: 36, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644692/780d0b6e-01a6-4408-acb9-8c73fc5abedb.png", productoId: 5 },
                        { id: 37, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644685/c5fe85b2-52ed-410b-b62d-55e71f541839.png", productoId: 5 },
                        { id: 38, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644671/fa488de7-cc62-496b-b6bd-1d0ec0cb7f04.png", productoId: 5 },
                        { id: 39, urlImagen: "https://res.cloudinary.com/df54sjac9/image/upload/v1736644665/a4623c19-5efd-4449-a646-bd4cd9c00f0f.png", productoId: 5 },
                    ];
                    return [4 /*yield*/, prisma.imagen.createMany({ data: imagenes, skipDuplicates: true })];
                case 3:
                    _a.sent();
                    productoCategorias = [
                        { productoId: 1, categoriaId: 1 },
                        { productoId: 2, categoriaId: 1 },
                        { productoId: 3, categoriaId: 1 },
                        { productoId: 4, categoriaId: 1 },
                        { productoId: 5, categoriaId: 1 },
                    ];
                    return [4 /*yield*/, prisma.productoCategoria.createMany({ data: productoCategorias, skipDuplicates: true })];
                case 4:
                    _a.sent();
                    console.log("Database seeded successfully.");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
