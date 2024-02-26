const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();

// Define a route to trigger index creation
app.get('/createIndex', async (req, res) => {
  try {
    await Product.init(); // Ensure indexes are created
    res.send('Index created successfully');
  } catch (err) {
    console.error('Error creating index:', err);
    res.status(500).send('Error creating index');
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase');

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
