const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Redirect to an "email already in use" page
      return res.status(409).redirect('/email-in-use.html');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    // Redirect to the signup success page
    res.status(201).redirect('/signup-success.html');
  } catch (err) {
    next(err);
  }
});
// Updated login route
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Set session data
      req.session.userId = user._id;
      req.session.email = user.email;
      // Redirect to the successful login page (e.g., dashboard)
      res.status(200).redirect('/dashboard.html');
    } else {
      // Redirect to the "invalid email or password" page
      res.status(401).redirect('/invalid-credentials.html');
    }
  } catch (err) {
    next(err);
  }
});

// Add a sign out route
router.get('/signout', (req, res) => {
  req.session.destroy(); // Remove session data
  res.redirect('/'); // Redirect to the main page (or any other page you prefer)
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Redirect to the successful login page (e.g., dashboard)
      res.status(200).redirect('/dashboard.html');
    } else {
      // Redirect to the "invalid email or password" page
      res.status(401).redirect('/invalid-credentials.html');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;