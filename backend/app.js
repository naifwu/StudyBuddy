const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { User } = require('./models');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure express-session middleware
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // Session will expire after 24 hours
}));

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));


// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    res.locals.isLoggedIn = true;
    res.locals.userEmail = req.session.email;
  } else {
    res.locals.isLoggedIn = false;
  }
  next();
}

// Apply the middleware to all routes
app.use(isLoggedIn);

// Use body-parser middleware for JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGODB_URI = 'mongodb+srv://naif:naif@studybuddy.1jqzvvo.mongodb.net/?retryWrites=true&w=majority';

console.log('MONGODB_URI:', MONGODB_URI);
console.log('typeof MONGODB_URI:', typeof MONGODB_URI);

// Route handlers
app.use('/users', userRoutes);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
});

app.get('/api/user-status', (req, res) => {
  if (req.session.userId) {
    res.json({ isLoggedIn: true, userEmail: req.session.email });
  } else {
    res.json({ isLoggedIn: false });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});