import { User } from '../schemas/userSchema.js';

export const requireAuth = async (req, res, next) => {
  const { user } = req.session;
  if (req.session && user) {
    const checkUser = await User.findOne({
      username: user.username,
    });
    if (!checkUser) {
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
        }
      });
      return res.status(401).send('Jūs neesat autorizējies!');
    }
  } else {
    return res.status(401).send('Jūs neesat autorizējies!');
  }

  next();
};

export const requireAdmin = (req, res, next) => {
  console.log('requireAdmin middleware hit');
  const { user } = req.session;

  if (!user) return res.status(401).send('Jūs neesat autorizējies!');

  if (user.role !== 'root') {
    return res.status(401).send('Jūms nav pietiekamas privilēģijas!');
  }
  next();
};

export const autoLogIn = async (req, res, next) => {
  const { user } = req.session;
  if (req.session && user) {
    const checkUser = await User.findOne({
      username: user.username,
    });
    if (!checkUser) {
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
        }
      });
      return res.status(200).send({ authenticated: false });
    }
  } else {
    return res.status(200).send({ authenticated: false });
  }

  next();
};
