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

wss.on('connection', (socket, request) => {
    const ip = request.socket.remoteAddress;
    console.log("New Connection from", ip);
    clients.push({ socket, address: ip });

    socket.on(`message`, message => {
        const data = JSON.parse(message);
        console.log(`Received message from ${ip}: ${data.value}`);

        // forward the message to all other clients EXCEPT the sender
        if (data.type === 'button') {
            clients.forEach(client => {
                client.socket.send(data.value);
            });
        }
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