import { Router } from 'express';
import { createProductCategory,getProductCategory } from '../Controllers/productCategory';

const router = Router();

router.get('/', createProductCategory);
router.post('/', getProductCategory);

export default router;