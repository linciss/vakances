import { check, validationResult } from 'express-validator';

export const validateVacancy = [
  check('title').trim().escape(),
  check('description').trim().escape(),
  check('address').trim().escape(),
  check('salary').trim().escape(),
  check('experience').trim().escape(),
  check('workTime').trim().escape(),
  check('workType').trim().escape(),
  check('load').trim().escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
