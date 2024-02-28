// setupWebSocketServer.js

const WebSocket = require('ws');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws) {
        console.log('Client connected');

        ws.on('message', function incoming(message) {
            // Handle incoming messages from clients
            console.log('Received: %s', message);
            // You can broadcast this message to all clients
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        // Send initial message or perform other tasks upon connection
        // ws.send('Welcome to the server!');
    });
}

module.exports = setupWebSocketServer;
