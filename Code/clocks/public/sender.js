const $buttons = document.querySelectorAll('.button');
const socket = new WebSocket('ws://' + window.location.host);

let writer;

const handleClick = (button) => {
    console.log(button.dataset.id);
    socket.send(JSON.stringify({
        type: "button",
        value: `${button.dataset.id}`
    }));
}

const init = () => {
    $buttons.forEach(button => {
        button.addEventListener('click', () => handleClick(button));
    });
}

init();