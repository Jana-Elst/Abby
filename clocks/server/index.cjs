//source: https://github.com/tigoe/websocket-examples/tree/main

// ------------------------ webSocket Server setup ------------------------ //
const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require('ws');
const wss = new Server({ server });
const port = 3000;

//supabase import
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.VITE_API_BASE_URL,
    process.env.VITE_API_KEY
)

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

// ------------------------ server setup ------------------------ //
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
        console.log(`Received message from ${ip}: ${data.device} ${data.value}`);

        // --- sending & receiving messages --- //
        //identify arduino clients and push them in a an other array
        if (data.type === 'arduino') {
            const arduino = clients.find(client => client.address === ip);
            if (arduino && !arduinos.some(a => a.address === ip)) {
                arduinos.push(arduino);
            }
        }

        if (data.type === 'messageToArduino') {
            const message = data.target.split('.');
            sendMessageToOneArduino(message[0], message[1], data.value);
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

// ------------------------ extra functions ------------------------ //
const sendMessageToOneArduino = (id, clockNumber, values) => {
    if (arduinos.length >= id) {
        const arduino = arduinos[id - 1];
        const message = JSON.stringify({
            number: clockNumber,
            message: values
        })

        console.log(values);
        console.log("send message to", arduino.address, message);
        arduino.socket.send(message);
    }
}

// ------------------------ get info from server ------------------------ //
//getData (1 time)
const getDataFromServer = async() => {
    try {
        let query = supabase.from('clocks').select('id, name, description, startTime, clockWallPos').not('clockWallPos', 'is', null);
        let { data, error } = await query;
        console.log(data);

        return data
    } catch (error) {
        console.error("Error fetching user clocks:", error);
        throw error;
    }
}

getDataFromServer();