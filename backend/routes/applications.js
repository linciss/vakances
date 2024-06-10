import express from 'express';

import {
  deleteApplication,
  getAllApplications,
  getApplicationById,
  getApplicationCount,
  submitApplication,
} from '../controllers/applicationController.js';
import { requireAdmin, requireAuth } from '../auth/requireAuth.js';

const router = express.Router();

router.post('/submit', submitApplication);
router.get('/count', requireAuth, getApplicationCount);

router.get('/get', requireAuth, getAllApplications);

router.get('/:id', requireAuth, getApplicationById);
router.delete('/:id', requireAuth, deleteApplication);

export default router;
