// app.js

const express = require('express');
const http = require('http');
const setupWebSocketServer = require('./setupWebSocketServer');

const app = express();
const server = http.createServer(app);

// Set up WebSocket server
setupWebSocketServer(server);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
