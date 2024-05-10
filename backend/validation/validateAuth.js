import { check, validationResult } from 'express-validator';

export const validateAuthentication = [
  check('username')
    .trim()
    .escape()
    .isLength({ min: 3, max: 20 })
    .withMessage(
      'Username must be at least 3 characters long and at most 20 characters long'
    ),
  check('password')
    .trim()
    .escape()
    .isLength({ min: 6, max: 20 })
    .withMessage(
      'Password must be at least 6 characters long and at most 20 characters long'
    ),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateChangePassword = [
  check('password').trim().escape().isLength({ min: 6, max: 20 }),
  check('newPassword').trim().escape().isLength({ min: 6, max: 20 }),
  check('newPasswordVerify').trim().escape().isLength({ min: 6, max: 20 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
