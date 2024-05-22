import express from 'express';
import { requireAuth } from '../auth/requireAuth.js';
import { validateVacancy } from '../validation/validateVacancy.js';
import {
  createVacancy,
  deleteVacancy,
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

export default router;
