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

// ------------------------ check for db changes and send it to the server ------------------------ //
const channelA = supabase
    .channel('schema-db-changes')
    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'clocks',
        },
        (payload) => {
            // console.log('update from db:', payload);

            //send the update to the arduinos
            sendMessageToArduino(payload);
        }
    )
    .subscribe()

// ------------------------ if server is connected / receive and send messages ------------------------ //
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

        //sending message to arduino
        // if (data.type === 'messageToArduino') {
        //     const message = data.target.split('.');
        //     sendMessageToOneArduino();
        // }
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

// ------------------------ get info from server ------------------------ //
//getData (1 time)
const getDataFromServer = async () => {
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

// ------------------------ send right message to the arduino ------------------------ //
const sendMessageToArduino = (payload) => {
    console.log('db change!');
    const clocksPerArduino = 3;
    const clockWallPos = payload.new.clockWallPos;

    const arduinoNumber = Math.ceil(clockWallPos / clocksPerArduino);
    const clockNumber = clockWallPos % clocksPerArduino

    const arduino = arduinos[arduinoNumber - 1];
    const message = JSON.stringify({
        clockNumber: clockNumber,
        startTime: payload.new.startTime,
        stopTime: payload.new.stopTime,
        name: payload.new.name
    })

    console.log("send message to", arduino.address, message);
    arduino.socket.send(message);
}