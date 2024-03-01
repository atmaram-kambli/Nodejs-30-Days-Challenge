const express = require('express');
const router = express.Router();

// Example route handler
router.get('/', (req, res) => {
    // Simulating an error for demonstration
    throw new Error('This is an example error');
});

module.exports = router;
