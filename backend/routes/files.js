import express from 'express';
import {
  downloadFile,
  getFiles,
  uploadFile,
} from '../controllers/FileController.js';
import { File } from '../schemas/fileSchema.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// router.post('/upload', uploadFile);
router.post('/upload', upload.single('file'), uploadFile);
router.get('/download/:id', downloadFile);
router.get('/get/:id', getFiles);

export default router;
