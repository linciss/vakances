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

router.get('/:id', getSingleVacancy);

router.delete('/:id', requireAuth, deleteVacancy);

router.put('/edit/:id', requireAuth, editVacancy);

export default router;
