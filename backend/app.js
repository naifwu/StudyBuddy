const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, StudyGroup, ChatMessage } = require('./models');
const userRoutes = require('./routes/userRoutes');
const studyGroupRoutes = require('./routes/studyGroupRoutes');
require('dotenv').config({ path: './.env' });

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGODB_URI = 'mongodb+srv://naifnaif:naifnaif@naif.hvnfz6x.mongodb.net/?retryWrites=true&w=majority';

console.log('MONGODB_URI:', MONGODB_URI);
console.log('typeof MONGODB_URI:', typeof MONGODB_URI);

// Route handlers
app.use('/users', userRoutes);
app.use('/study-groups', studyGroupRoutes);

// Serve static files from the "frontend" folder
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// Serve the index.html file for any request that does not match a specific static file or route
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// Route handlers
app.use('/users', userRoutes);
app.use('/study-groups', studyGroupRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});