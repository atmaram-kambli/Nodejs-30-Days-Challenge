const express = require('express');
const app = express();

// Define the rate limit settings
const RATE_LIMIT = 5; // Number of requests allowed per time window
const TIME_WINDOW = 60000; // Time window in milliseconds (e.g., 60000 ms = 1 minute)

// Create an object to store the request counts for each IP address
const requestCounts = {};

// Middleware function to implement rate limiting
function rateLimitMiddleware(req, res, next) {
    const clientIP = req.ip; // Get client's IP address

    // Check if the clientIP exists in the requestCounts object
    if (!requestCounts[clientIP]) {
        // If not, initialize it with a count of 1
        requestCounts[clientIP] = 1;
    } else {
        // If it exists, increment the count
        requestCounts[clientIP]++;
    }

    // Check if the request count exceeds the rate limit
    if (requestCounts[clientIP] > RATE_LIMIT) {
        // If exceeded, send a 429 Too Many Requests response
        res.status(429).send('Too Many Requests');
    } else {
        // If within the limit, proceed to the next middleware
        next();
    }
}

// Apply the rate-limiting middleware to all routes
app.use(rateLimitMiddleware); 

// Define your routes below

// Example route
app.get('/', (req, res) => {
    res.send(`Hello User!\n Request no. ${requestCounts[req.ip]}`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
