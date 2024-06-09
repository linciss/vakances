import { User } from '../schemas/userSchema.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const attemptChangePassword = async (req, res) => {
  const { password, newPassword, newPasswordVerify } = req.body;
  const { user } = req.session;

  if (!password || !newPassword || !newPasswordVerify) {
    return res.status(401).send('Lūdzu aizpildiet visus laukus!');
  }

  try {
    const dbUser = await User.findOne({ username: user.username });

    const match = await bcrypt.compare(password, dbUser.password);

    if (!match) {
      return res.status(401).send('Nepareiza parole!');
    }

    if (password === newPassword) {
      return res.status(401).send('Paroles ir vienādas!');
    }

    if (newPassword !== newPasswordVerify) {
      return res.status(401).send('Paroles nesakrīt!');
    }

    const hash = await bcrypt.hash(newPassword, saltRounds);

    await User.updateOne({ username: dbUser.username }, { password: hash });

    res.status(200).json('Parole nomainīta!');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Kļūda ienākošajos datus!');
  }
};

export const attemptChangeUsername = async (req, res) => {
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
};

export const makeUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(401).send('Ievadiet visus laukus!');
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
};
