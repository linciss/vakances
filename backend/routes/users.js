import express from 'express';
import { requireAdmin, requireAuth } from '../auth/requireAuth.js';
import {
  attemptChangePassword,
  attemptChangeUsername,
  makeUser,
} from '../controllers/userController.js';
import {
  validateAuthentication,
  validateChangePassword,
} from '../validation/validateAuth.js';
import limiter from '../controllers/rateLimiter.js';

const router = express.Router();

router.put('/change-username', requireAuth, attemptChangeUsername);

router.put(
  '/change-password',
  validateChangePassword,
  requireAuth,
  limiter(5),
  attemptChangePassword
);

router.post(
  '/make-user',
  validateAuthentication,
  limiter(10),
  requireAdmin,
  makeUser
);

export default router;
