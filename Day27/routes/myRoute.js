const express = require('express');
const router = express.Router();

// Import your middleware function
const authenticateAndAuthorize = require('../middleware/auth');

// Define your routes
router.get('/protected-route', authenticateAndAuthorize, (req, res) => {
    res.json({ message: 'This is a protected route for admin users' });
});

// Add more routes as needed

module.exports = router;
