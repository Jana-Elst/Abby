import { useOutletContext} from "react-router";
import { sendToServer } from "../services/clock";

const FormEnd = () => {
    const { socket, clock } = useOutletContext();

    const handleClick = () => {
        sendToServer(
                    socket,
                    clock,
                    {
                        status: 'available'
                    }
                );
    }

    return (
        <>
            <h1>Je form is gesubmit</h1>
            <button onClick = {handleClick}>STOP</button>
        </>
    );
};

export default FormEnd;