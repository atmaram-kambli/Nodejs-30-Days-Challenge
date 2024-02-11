const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticationMiddleware(req, res, next) {
  // Check if authorization header is present
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  // Check if authorization header is in the format 'Bearer <token>'
  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid authorization header format' });
  }

  // Extract the token
  const token = tokenParts[1];

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      // Token is valid, attach the decoded token to the request object
      req.user = decodedToken;
      next(); // Allow the request to proceed
    }
  });
}

app.use(authenticationMiddleware);

// Example route
app.get('/', (req, res) => {
  res.send('Authenticated!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
