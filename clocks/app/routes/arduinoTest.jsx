import { useOutletContext } from "react-router";

const handleClick = (data, ws) => {
    ws.send(JSON.stringify({
        type: "button",
        value: `${data}`
    }));
}

const ArduinoTest = () => {
    const { ws, clock } = useOutletContext();

    return (
        <>
            <button className="button" onClick={() => handleClick("1.1", ws)}>red 1</button>
            <button className="button" onClick={() => handleClick("1.2", ws)}>yellow 1</button>
            <button className="button" onClick={() => handleClick("1.3", ws)}>green 1</button>
            <button className="button" onClick={() => handleClick("2.1", ws)}>red 2</button>
            <button className="button" onClick={() => handleClick("2.2", ws)}>yellow 2</button>
            <button className="button" onClick={() => handleClick("2.3", ws)}>green 2</button>
        </>
    );
};

export default ArduinoTest;