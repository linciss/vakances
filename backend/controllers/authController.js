import { User } from '../schemas/userSchema.js';
import bcrypt from 'bcrypt';

export const attemptLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(418).send('Lūdzu aizpildiet visus laukus!');
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(418).send('Nepareizs lietotājvārds vai parole!');
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.authenticated = true;

      req.session.user = {
        username,
        role: user.role,
        timeCreated: user.timeCreated,
        isLoggedIn: true,
      };

      res.status(200).json(req.session.user);
      console.log(req.session, 'logged in!');
    } else {
      res.status(418).send('Nepareizs lietotājvārds vai parole!');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda ienākošajos datus!');
  }
};

export const attemptLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    res.clearCookie(process.env.SESSION_NAME);
    res.status(200).json('Logged out');
  });
};
