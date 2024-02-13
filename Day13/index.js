const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const path = require('path');
// console.log(path.join(__dirname, '/index.html'))

function setupWebSocket(server) {
  const app = express();
  const wsServer = new WebSocket.Server({ server });

  wsServer.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
      ws.send(message); // Echo back the message
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  app.get('/websocket', (req, res) => {
    res.sendFile(path.join(__dirname, '\index.html'));
  });

  return app;
}

// Create an HTTP server
const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");
};
const server = http.createServer(requestListener);

// Setup WebSocket
setupWebSocket(server);

// Start the server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
