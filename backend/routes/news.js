import express from 'express';
import { requireAuth } from '../auth/requireAuth.js';
import {
  createNews,
  deleteNews,
  editNews,
  getSingleNews,
  getNews,
  getNewsCount,
} from '../controllers/newsController.js';

const router = express.Router();

router.get('/count', requireAuth, getNewsCount);
router.post('/create', requireAuth, createNews); 
router.get('/all', getNews);
router.get('/:id', getSingleNews);
router.delete('/:id', requireAuth, deleteNews);
router.put('/:id', requireAuth, editNews);

export default router;
