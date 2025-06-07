import { useOutletContext, useNavigate, Navigate, Form, redirect } from "react-router";
import { sendToServer } from "../services/clock";
import { useState } from "react";


const FormClock = () => {
    const { socket, clock } = useOutletContext();

    const [name, setName] = useState("");
    const [status, setStatus] = useState("")
    const navigate = useNavigate();

    //if user navigates back and forward, the clock will show the correct state.
    /*
    if statement, because if the user types a letter in the input field,
    react will rereder the page and without if statement it keeps sending status update's to the arduino.
    */
    if (status !== "setup") {
        setStatus("setup");
        sendToServer(
            socket,
            clock,
            {
                status: 'setup'
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendToServer(
            socket,
            clock,
            {
                name: e.target.name.value,
                status: 'play'
            }
        );
        navigate("/end");
    }

    return (
        <>
            <h1>Start je activiteit nu!</h1>
            <Form onSubmit={handleSubmit}>
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
            </Form>
        </>
    );
};

export default FormClock;