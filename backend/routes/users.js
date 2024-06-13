import express from 'express';
import { requireAdmin, requireAuth } from '../auth/requireAuth.js';
import {
  attemptChangePassword,
  attemptChangeUsername,
  deleteUser,
  getAllUsers,
  getUser,
  getUserCount,
  makeUser,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.put('/change-username', requireAuth, attemptChangeUsername);

router.put(
  '/change-password',

  requireAuth,
  attemptChangePassword
);

router.post('/new', requireAdmin, makeUser);
router.get('/count', requireAuth, getUserCount);
router.get('/all', requireAdmin, getAllUsers);
router.delete('/:id', requireAdmin, deleteUser);
router.get('/:id', requireAdmin, getUser);
router.put('/:id', requireAdmin, updateUser);

export default router;
