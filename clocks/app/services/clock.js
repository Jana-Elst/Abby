const totalClocks = 3;
const clocksPerArduino = 3;
const occupiedClocks = [];
let freeClocks = [];

//make an array of all the free clocks
const addFreeClocks = () => {
    for (let i = 1; i <= totalClocks; i++) {
        if (!occupiedClocks.includes(i)) {
            freeClocks.push(i);
        }
    }
}

//get a random clock from the free clocks
export const clockNumber = () => {
    addFreeClocks();
    const clockId = Math.floor(Math.random() * freeClocks.length);
    const clock = freeClocks[clockId];
    return clock;
}

//create the code for the right arduino
//Each arduino controls 3 clocks
export const arduinoCode = (clockNumber) => {
    const arduinoId = Math.ceil(clockNumber / clocksPerArduino);
    let clockId = clockNumber % 3;
    if (clockId === 0) {
        clockId = clocksPerArduino;
    }

    return `${arduinoId}.${clockId}`;
}

//send JSON to server
export const sendToServer = (ws, clock, value) => {
    const codeArduino = arduinoCode(clock);

    ws.send(JSON.stringify({
        type: 'messageToArduino',
        device: "arduino",
        target: codeArduino,
        value: value
    }));
    console.log('send', value);
}