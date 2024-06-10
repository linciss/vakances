import express from 'express';
import { requireAdmin, requireAuth } from '../auth/requireAuth.js';
import {
  attemptChangePassword,
  attemptChangeUsername,
  deleteUser,
  getAllUsers,
  getUserCount,
  makeUser,
} from '../controllers/userController.js';
import {
  validateAuthentication,
  validateChangePassword,
} from '../validation/validateAuth.js';
import limiter from '../controllers/rateLimiter.js';

const router = express.Router();

router.put('/change-username', requireAuth, limiter(5), attemptChangeUsername);

router.put(
  '/change-password',
  validateChangePassword,
  requireAuth,
  limiter(5),
  attemptChangePassword
);

router.post(
  '/new',
  validateAuthentication,
  limiter(10),
  requireAdmin,
  makeUser
);

router.get('/all', requireAdmin, getAllUsers);
router.delete('/:id', requireAdmin, deleteUser);
router.get('/count', requireAuth, getUserCount);

export default router;
