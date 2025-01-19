import { getProducts,createProduct, getProductsbyCategory, updateProduct, deleteProduct, getProductById, getProductsPaginated, getPaginatedProductsByCategory } from '../Controllers/Product';

import { Router } from 'express';

const ProductRouter = Router();
ProductRouter.get('/paginados', getProductsPaginated);
ProductRouter.get('/categoria/:categoriaId', getProductsbyCategory);
ProductRouter.get('/categoria/:categoriaId/paginados',getPaginatedProductsByCategory );

ProductRouter.get('/', getProducts);
ProductRouter.get('/:id', getProductById);
ProductRouter.post('/', createProduct);
ProductRouter.put('/:id', updateProduct);
ProductRouter.delete('/:id', deleteProduct);

export default ProductRouter;