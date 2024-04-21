import express from 'express';
import { requireAdmin, requireAuth } from '../auth/requireAuth.js';
import {
  attemptChangePassword,
  attemptChangeUsername,
  attemptLogin,
  attemptLogout,
  attemptRegister,
} from '../controllers/authController.js';
import limiter from '../controllers/rateLimiter.js';
import { validateAuthentication } from '../validation/validate.js';

const router = express.Router();

// LOGIN AND REGISTER AND SO ON

// need to authorise user later :)) PLEASE DONT FORGET
router.post(
  '/register',
  validateAuthentication,
  limiter(10),
  requireAdmin,
  attemptRegister
);

router.post('/login', validateAuthentication, limiter(10), attemptLogin);

router.get('/logout', attemptLogout);

router.put('/change-password', requireAuth, limiter(5), attemptChangePassword);

router.put('/change-username', requireAuth, attemptChangeUsername);

router.get('/user-authentication', requireAuth, (req, res) => {
  console.log('user is authenticated!');
  res.status(200).json(req.session.user);
});

export default router;
