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

  if (!username || !password || !role) {
    return res.status(401).send('Ievadiet visus laukus!');
  }

  if (role !== 'moderator' && role !== 'root' && role !== 'admin') {
    return res.status(401).send('Nepareiza lietotāja loma!');
  }

  if (role === 'root') {
    return res.status(401).send('Jums nav atļaujas izveidot šādu lietotāju!');
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
        timeCreated: user.timeCreated,
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

router.put('/change-password', requireAuth, async (req, res) => {
  const { oldPassword, newPassword, newPasswordVerify } = req.body;
  const { user } = req.session;

  if (!oldPassword || !newPassword || !newPasswordVerify) {
    return res.status(401).send('Ievadiet visus laukus!');
  }

  if (newPassword !== newPasswordVerify) {
    return res.status(401).send({ error: 'passwords_do_not_match' });
  }

  try {
    const dbUser = await User.findOne({ username: user.username });

    const match = await bcrypt.compare(oldPassword, dbUser.password);

    if (!match) {
      return res.status(401).send({ error: 'incorrect_password' });
    }

    if (oldPassword === newPassword) {
      return res.status(401).send({ error: 'passwords_are_the_same' });
    }

    const hash = await bcrypt.hash(newPassword, saltRounds);

    await User.updateOne({ username: dbUser.username }, { password: hash });

    res.status(200).send('Parole nomainīta!');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Kļūda ienākošajos datus!');
  }
});

router.put('/change-username', requireAuth, async (req, res) => {
  const { newUsername, password } = req.body;
  const { user } = req.session;

  if (!newUsername) {
    return res.status(401).send({ error: 'fill_all_fields' });
  }

  if (newUsername === user.username) {
    return res.status(401).send({ error: 'username_is_the_same' });
  }

  try {
    const dbUser = await User.findOne({ username: user.username });

    // check whether user exists
    const userExists = await User.findOne({
      username: { $regex: new RegExp(`^${newUsername}$`, 'i') },
    });

    if (userExists) {
      return res.status(401).send({ error: 'user_exists' });
    }

    const match = await bcrypt.compare(password, dbUser.password);

    if (!match) {
      return res.status(401).send({ error: 'incorrect_password' });
    }

    await User.updateOne(
      { username: dbUser.username },
      { username: newUsername }
    );

    req.session.user.username = newUsername;

    res.status(200).json(req.session.user);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Kļūda ienākošajos datus!');
  }
});

// check whether user is authenticated
router.get('/user-authentication', requireAuth, (req, res) => {
  console.log('user is authenticated!');
  res.status(200).json(req.session.user);
});

export default router;
