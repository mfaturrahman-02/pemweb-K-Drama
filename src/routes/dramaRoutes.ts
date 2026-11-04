import { Router } from 'express';
import {
  getAllDramas,
  createDrama,
  updateDrama,
  deleteDrama
} from '../controllers/dramaController';
import { validateDramaInput } from '../middleware/dramaMiddleware';

const router = Router();


router.get('/', getAllDramas);

router.post('/', validateDramaInput, createDrama);


router.put('/:id', validateDramaInput, updateDrama);

router.delete('/:id', deleteDrama);

export default router;
