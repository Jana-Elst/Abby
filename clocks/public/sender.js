const $button = document.querySelector('.button');
const socket = new WebSocket('ws://' + window.location.host);

const handleClick = () => {
    console.log('klik');
    socket.send(JSON.stringify({
        type: "button",
        value: "LED_ON"
    }));
}

const init = () => {
    $button.addEventListener('click', handleClick);
}

init();