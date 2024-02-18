// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Define your User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // Add any other fields you need
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Create Express app
const app = express();

// Define Express route to get all users
app.get('/users', async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();
    // Send JSON response with array of user objects
    res.json(users);
  } catch (err) {
    // If there's an error, send an error response
    res.status(500).json({ error: err.message });
  }
});

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
