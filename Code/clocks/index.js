//source: https://github.com/tigoe/websocket-examples/tree/main

// ------------------------ webSocket Server setup ------------------------ //
const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require('ws');
const wss = new Server({ server });
const port = 3000;

// ------------------------ aray with all clients (= objects) ------------------------ //
/*
object structure example
{
socket:
ip: 123.123.123
}
*/
let clients = [];
let arduinos = [];

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
        console.log(`Received message from ${ip}: ${data.type}`);

        //identify arduino clients
        if (data.type === 'arduino') {
            const arduino = clients.find(client => client.address === ip);
            if (arduino && !arduinos.some(a => a.address === ip)) {
                arduinos.push(arduino);
            }
        }

        if (data.type === 'button') {
            const message = data.value.split('.');
            sendMessageToOneArduino(message[0], message[1])
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

const sendMessageToOneArduino = (id, clockNumber) => {
    if (arduinos.length >= id) {
        const arduino = arduinos[id - 1];
        const message = JSON.stringify({
            number: clockNumber,
            name: 'naam activiteit'
        })

        console.log("send message to", arduino.address);
        arduino.socket.send(message);
    }
}

//