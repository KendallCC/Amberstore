import { Router } from 'express';
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from '../Controllers/Category';
const Categoryrouter = Router();

Categoryrouter.get('/', getCategorias);
Categoryrouter.post('/', createCategoria);
Categoryrouter.put('/:id', updateCategoria); // Ruta para actualizar
Categoryrouter.delete('/:id', deleteCategoria); // Ruta para eliminar
export default Categoryrouter; 

