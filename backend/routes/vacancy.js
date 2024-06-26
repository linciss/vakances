import express from 'express';
import { requireAuth } from '../auth/requireAuth.js';
import { validateVacancy } from '../validation/validateVacancy.js';
import {
  createVacancy,
  deleteVacancy,
  editVacancy,
  getSingleVacancy,
  getVacancies,
  getVacancyCount,
} from '../controllers/vacancyController.js';

const router = express.Router();

router.get('/count', requireAuth, getVacancyCount);

router.post('/create', validateVacancy, requireAuth, createVacancy);

router.get('/all', getVacancies);
router.get('/admin', requireAuth, getVacancies);

router.get('/admin/:id', requireAuth, getSingleVacancy);
router.get('/:id', getSingleVacancy);

router.delete('/:id', requireAuth, deleteVacancy);

router.put('/:id', requireAuth, editVacancy);

export default router;
