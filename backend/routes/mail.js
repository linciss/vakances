import express from 'express';
import { sendMail } from '../controllers/mailer.js';

const router = express.Router();

router.post('/send', sendMail);

export default router;
