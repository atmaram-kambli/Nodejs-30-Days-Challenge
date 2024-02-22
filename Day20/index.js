// index.js

const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with error
  });

app.use('/', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
