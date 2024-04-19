export const requireAuth = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    return res.status(401).send('Jūs neesat autorizējies!');
  }
  next();
};

export const requireAdmin = (req, res, next) => {
  const { user } = req.session;

  if (!user) return res.status(401).send('Jūs neesat autorizējies!');

  if (user.role !== 'root') {
    return res.status(401).send('Jūms nav pietiekamas privilēģijas!');
  }
  next();
};
