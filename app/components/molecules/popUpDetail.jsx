import { useContext, useState } from "react";
import { useNavigate } from "react-router"

//components
import Button from "./button";

//root variables
import { UserContext } from '../../context/UserContext';


//functions
import { leaveClock, stopClock } from "../../services/data";

const PopUpDetail = ({ clock, isParticipant, setUiState, uiState }) => {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClickClose = () => {
        setUiState({
            ...uiState,
            popUpOpen: false,
            confirmation: false
        });
    }

    const handleClockLeave = async () => {
        const newParticipants = uiState.participants.filter(id => id !== userId);
        console.log(newParticipants);

        await leaveClock(userId, clock[0].id);

        setUiState({
            ...uiState,
            buttonState: 'join',
            popUpOpen: false,
            participants: newParticipants
        });
    }

    const handleStop = async () => {
        await stopClock(clock[0].id);

        setUiState({
            ...uiState,
            popUpOpen: false,
        });

        navigate(`${import.meta.env.BASE_URL}jouw-abbymomenten`);
    }

    //if clock is made my user
    //nu: pas aan & start
    if (clock[0].startTime && clock[0].creator === userId) {
        return (
            <>
                <p>Wil je jouw abbymoment stoppen?</p>
                <p>Als je jouw Abbymoment stopt zal dit bij de voorbije momenten opgeslagen worden.</p>
                <div>
                    <Button onClick={handleClickClose}>Annuleer</Button>
                    <Button onClick={handleStop}>Stop Abbymoment</Button>
                </div>
            </>
        )
    }

    //Scheduled & now
    //if user is joined
    if (isParticipant && uiState.popUpOpen) {
        console.log(uiState.buttonState);
        return (
            <>
                <p>Wil je dit Abbymoment verlaten?</p>
                <p>tekst tekst tekst</p>
                <div>
                    <Button onClick={handleClickClose}>Annuleer</Button>
                    <Button onClick={handleClockLeave}>Verlaat Abbymoment</Button>
                </div>
            </>
        )
    }

    if (isParticipant && uiState.confirmation) {
        return (
            <>
                <p>Joepie</p>
                <p>Je neemt deel aan dit Abbymoment.</p>
                <div>
                    <Button onClick={handleClickClose}>Sluit</Button>
                </div>
            </>
        )
    }
}

export default PopUpDetail;