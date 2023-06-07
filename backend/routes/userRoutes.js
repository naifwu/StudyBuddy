const express = require('express');
const router = express.Router();
const { signUp, login, getUser } = require('../controllers/userController');
const { body } = require('express-validator');

router.post(
  '/sign-up',
  [
    body('username').notEmpty().withMessage('Username is required.'),
    body('email').isEmail().withMessage('Email must be valid.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  ],
  signUp
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email must be valid.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  login
);

router.get('/:userId', getUser);

module.exports = router;