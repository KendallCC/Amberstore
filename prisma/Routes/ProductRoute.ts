import { getProducts,createProduct, getProductsbyCategory, updateProduct, deleteProduct, getProductById } from '../Controllers/Product';

import { Router } from 'express';

const ProductRouter = Router();

ProductRouter.get('/categoria/:categoriaId', getProductsbyCategory);
ProductRouter.get('/', getProducts);
ProductRouter.get('/:id', getProductById);
ProductRouter.post('/', createProduct);
ProductRouter.put('/:id', updateProduct);
ProductRouter.delete('/:id', deleteProduct);

export default ProductRouter;