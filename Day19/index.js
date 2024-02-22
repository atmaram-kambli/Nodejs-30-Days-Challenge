const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the user schema with validation for the email property
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    // Validate email format using a custom validator function
    validate: {
      validator: function(email) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: 'Invalid email format'
    }
  }
});

// Create a Mongoose model from the schema
const User = mongoose.model('User', userSchema);

// Route to add a new user with validation
app.post('/users', (req, res) => {
  const newUser = new User(req.body);

  newUser.save(function(err) {
    if (err) {
      // If there is a validation error, send a 400 Bad Request response with the error message
      if (err.errors && err.errors.email) {
        return res.status(400).json({ error: err.errors.email.message });
      }
      // If there is any other error, send a 500 Internal Server Error response
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    // If the user is saved successfully, send a 201 Created response
    res.status(201).json({ message: 'User added successfully' });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
