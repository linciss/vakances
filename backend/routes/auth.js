import express from 'express';

const router = express.Router();

const requireAuth = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    return res.status(401).send('Jūs neesat autorizējies!');
  }
  next();
};

const requireAdmin = (req, res, next) => {
  const { user } = req.session;

  if (user.role !== 'root') {
    return res.status(401).send('Jūs neesat autorizējies!');
  }
  next();
};

const user = {
  username: 'admin',
  password: 'admin',
  role: 'root',
};

router.post('/login', (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).send('Nepareizs lietotājvārds vai parole!');
  }

  if (password === user.password && username === user.username) {
    req.session.authenticated = true;

    req.session.user = {
      username,
      role: user.role,
    };

    res.status(200).json({ message: 'Logged in' });
    console.log(req.session, 'logged in!');
  } else {
    res.status(401).send('Nepareizs lietotājvārds vai parole!');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    console.log('logged out!', req.session);
    res.clearCookie(process.env.SESSION_NAME);
    res.status(200).send('Logged out');
  });
});

// check whether user is authenticated
router.get('/user-authentication', requireAuth, (req, res) => {
  console.log('user is authenticated!');
  res.status(200).json(req.session.user);
});

export default router;
