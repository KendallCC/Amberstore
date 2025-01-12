import { Router } from 'express';
import { getImagenes,createImagen } from '../Controllers/Images';

const router = Router();

router.get('/', getImagenes);
router.post('/', createImagen);

export default router;  