import express from 'express';
import {
  downloadFile,
  getFiles,
  uploadPdf,
  uploadPng,
} from '../controllers/FileController.js';

import multer from 'multer';
import { requireAuth } from '../auth/requireAuth.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// router.post('/upload', uploadFile);
router.post('/upload', requireAuth, upload.single('file'), uploadPdf);
router.post('/upload/image', requireAuth, upload.single('file'), uploadPng);
router.get('/download/:id', requireAuth, downloadFile);
router.get('/get/:id', requireAuth, getFiles);

export default router;
