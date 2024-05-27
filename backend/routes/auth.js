import express from 'express';
import { requireAdmin, requireAuth } from '../auth/requireAuth.js';
import { attemptLogin, attemptLogout } from '../controllers/authController.js';
import limiter from '../controllers/rateLimiter.js';
import { validateAuthentication } from '../validation/validateAuth.js';

const router = express.Router();

// LOGIN AND REGISTER AND SO ON

// need to authorise user later :)) PLEASE DONT FORGET

router.post('/login', validateAuthentication, limiter(10), attemptLogin);

router.get('/logout', attemptLogout);

router.get('/user-authentication', requireAuth, (req, res) => {
  res.status(200).json(req.session.user);
});

export default router;
