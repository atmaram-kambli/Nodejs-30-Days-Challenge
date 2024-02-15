// Import necessary modules
const express = require('express');

// Create Express application
const app = express();

// Logging middleware
function loggingMiddleware(req, res, next) {
  // Get current timestamp
  const timestamp = new Date().toISOString();

  // Log request details
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  // Pass control to the next middleware
  next();
}

// Add logging middleware
app.use(loggingMiddleware);

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
