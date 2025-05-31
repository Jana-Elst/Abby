import { useOutletContext, useNavigate, Navigate } from "react-router";
import { arduinoCode } from "../services/clock";
import { useState } from "react";


const Form = () => {
    const { ws, clock } = useOutletContext();
    const codeArduino = arduinoCode(clock);

    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        ws.send(JSON.stringify({
            device: "arduino",
            target: codeArduino,
            name: e.target.name.value,
            status: 'play'
        }));
        console.log('send', e.target.name.value);
    }

    return (
        <>
            <h1>Start je activiteit nu!</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Activiteit:
                    <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <input type="submit" value="START" />
            </form>
        </>
    );
};

export default Form;