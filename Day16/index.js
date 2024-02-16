const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000; // or any port you prefer

// MongoDB connection string
const mongoDBURL = 'mongodb://localhost/mydatabase';

// Connect to MongoDB
mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get the default connection
const db = mongoose.connection;

// Event handling for connection error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Event handling for successful connection
db.once('open', function() {
  console.log('Connected to MongoDB successfully!');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
