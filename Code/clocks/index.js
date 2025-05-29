//source: https://github.com/tigoe/websocket-examples/tree/main

// ------------------------ webSocket Server setup ------------------------ //
const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require('ws');
const wss = new Server({ server });
const port = 3000;

let clients = [];         // list of client connections

app.use(express.static('public'))
server.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

// ------------------------ webSocket Server functions ------------------------ //
//dit aanpassen dat er een messag naar 1 kan gestuurd worden
// This function broadcasts messages to all webSocket clients
// const broadcast = (data) => {
//     clients.forEach(client => {
//         client.socket.send(JSON.stringify(data));
//     });
// };

wss.on('connection', (socket, request) => {
    const ip = request.socket.remoteAddress;
    console.log("New Connection from", ip);
    clients.push({ socket, address: ip });

    socket.on(`message`, message => {
        console.log(`Received message from ${ip}: ${message}`);
        // broadcast({ from: ip, message: message.toString() });
    });

    socket.on(`close`, () => {
        //remove client from list
        const index = clients.findIndex(c => c.socket === socket);
        if (index !== -1) {
            clients.splice(index, 1);
            console.log(`Connection closed for ${ip}`);
        }
    });
})