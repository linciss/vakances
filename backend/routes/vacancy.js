import express from 'express';
import { requireAuth } from '../auth/requireAuth.js';
import { validateVacancy } from '../validation/validateVacancy.js';
import {
  createVacancy,
  getSingleVacancy,
  getVacancies,
  getVacancyCount,
} from '../controllers/vacancyController.js';

const router = express.Router();

router.get('/count', requireAuth, getVacancyCount);

router.post('/create', validateVacancy, requireAuth, createVacancy);

router.get('/all', getVacancies);

router.get('/:id', getSingleVacancy);

export default router;
