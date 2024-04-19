import express from 'express';
import { User } from '../schemas/userSchema.js';
import bcrypt from 'bcrypt';
import { requireAdmin, requireAuth } from '../auth/authMiddleWare.js';

const router = express.Router();
const saltRounds = 10;

// LOGIN AND REGISTER AND SO ON

// need to authorise user later :)) PLEASE DONT FORGET
router.post('/register', requireAdmin, async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(401).send('Lietotājvārds un parole ir obligāti!');
  }

  //check whether user exists
  const user = await User.findOne({ username });

  if (user) {
    return res.status(401).send('Lietotājs jau eksistē!');
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: hash,
      role: role,
    });

    await newUser.save();

    res.status(200).send('Lietotājs saglabāts!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda saglabājot lietotāju!');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).send('Nepareizs lietotājvārds vai parole!');
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send('Nepareizs lietotājvārds vai parole!');
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.authenticated = true;

      req.session.user = {
        username,
        role: user.role,
      };

      res.status(200).json(req.session.user);
      console.log(req.session, 'logged in!');
    } else {
      res.status(401).send('Nepareizs lietotājvārds vai parole!');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda ienākošajos datus!');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Server error');
    }
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
