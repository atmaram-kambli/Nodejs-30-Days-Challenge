const mongoose = require('mongoose');

// Define the Mongoose schema for User
const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

// Create the Mongoose model for User
const User = mongoose.model('User', userSchema);

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

/**
 * Adds a new user to the MongoDB database
 * @param {Object} user - User object with properties username and email
 */
async function addUserToDatabase(user) {
  try {
    // Create a new User object
    const newUser = new User(user);
    // Save the user to the database
    await newUser.save();
    console.log("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

// Test the function
addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });
