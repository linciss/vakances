import { User } from '../schemas/userSchema.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const attemptChangePassword = async (req, res) => {
  const { password, newPassword, newPasswordVerify } = req.body;
  const { user } = req.session;

  if (!password || !newPassword || !newPasswordVerify) {
    return res.status(418).send('Lūdzu aizpildiet visus laukus!');
  }
  if (
    password.length < 6 ||
    newPassword.length < 6 ||
    newPasswordVerify.length < 6
  ) {
    return res.status(418).json('Parole par īsu');
  }

  try {
    const dbUser = await User.findOne({ username: user.username });

    const match = await bcrypt.compare(password, dbUser.password);

    if (!match) {
      return res.status(418).send('Nepareiza parole!');
    }

    if (password === newPassword) {
      return res.status(418).send('Paroles ir vienādas!');
    }

    if (newPassword !== newPasswordVerify) {
      return res.status(418).send('Paroles nesakrīt!');
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
    return res.status(418).send({ error: 'fill_all_fields' });
  }

  if (newUsername === user.username) {
    return res.status(418).send({ error: 'username_is_the_same' });
  }

  if (newUsername.length < 3) {
    return res.status(418).send({ error: 'username_too_short' });
  }

  try {
    const dbUser = await User.findOne({ username: user.username });

    // check whether user exists
    const userExists = await User.findOne({
      username: { $regex: new RegExp(`^${newUsername}$`, 'i') },
    });

    if (userExists) {
      return res.status(418).send({ error: 'user_exists' });
    }

    const match = await bcrypt.compare(password, dbUser.password);

    if (!match) {
      return res.status(418).send({ error: 'incorrect_password' });
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
    return res.status(418).send('Ievadiet visus laukus!');
  }

  if (role !== 'admin' && role !== 'mod') {
    return res.status(418).json('Nav tadu privilegiju');
  }

  if (password.length < 6) {
    return res.status(418).json('Parole par īsu');
  }

  if (username.length < 3) {
    return res.status(418).json('Lietotājvārds par īsu');
  }
  const { user } = req.session;

  if (user.role !== 'root' && role === 'admin') {
    return res.status(401).json('Nav autorizācija!');
  }

  //check whether user exists
  const userCheck = await User.findOne({ username });

  if (userCheck) {
    return res.status(418).send('Lietotājs jau eksistē!');
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong!');
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (user.role === 'root') {
      return res.status(401).json('Nav autorizācija!');
    }

    await User.findByIdAndDelete(id);

    res.status(200).json('User deleted!');
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong!');
  }
};

export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json(count);
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong!');
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  const { user } = req.session;
  const currUser = user;

  try {
    const user = await User.findById(id);

    if (currUser.username === user.username) {
      return res.status(418).json('Sevi nevar rediģēt!');
    }

    if (user.role === 'root') {
      return res.status(500).json('Nav privilēģiju!');
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong!');
  }
};

export const updateUser = async (req, res) => {
  const { username, password } = req.body;

  const id = req.params.id;
  const { user } = req.session;
  const currUser = user;

  try {
    const user = await User.findById(id);

    if (currUser.username === user.username) {
      return res.status(418).json('Sevi nevar rediģēt!');
    }

    if (user.role === 'root') {
      return res.status(500).json('Nav privilēģiju!');
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return res.status(418).json('Parole nevar būt tāda paša!');
    }

    const userExists = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') },
    });

    if (userExists) {
      return res.status(418).json('Lietotājvārds jau eksistē!');
    }

    const hash = await bcrypt.hash(password, saltRounds);

    if (!username && !password) {
      return res.status(418).json('Nav ko rediģēt!');
    }

    if (username && username.length < 3) {
      return res.status(418).json('Lietotājvārds par īsu');
    }

    if (password && password.length < 6) {
      return res.status(418).json('Parole par īsu');
    }

    const update = {};
    if (username) update.username = username;
    if (password) update.password = hash;

    await User.updateOne({ _id: id }, update);

    res.status(200).json('Lietotājs rediģēts!');
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong!');
  }
};
