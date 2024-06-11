import express from 'express';
import {
  downloadFile,
  getFiles,
  uploadFile,
} from '../controllers/FileController.js';
import { File } from '../schemas/fileSchema.js';
import multer from 'multer';
import { requireAuth } from '../auth/requireAuth.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// router.post('/upload', uploadFile);
router.post('/upload', requireAuth, upload.single('file'), uploadFile);
router.get('/download/:id', requireAuth, downloadFile);
router.get('/get/:id', requireAuth, getFiles);

export default router;
