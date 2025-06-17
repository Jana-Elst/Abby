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

        await leaveClock(userId, clock[0].id);

        setUiState({
            ...uiState,
            buttonState: 'join',
            popUpOpen: false,
            participants: newParticipants
        });
    }

    const handleStop = async () => {
        navigate(`${import.meta.env.BASE_URL}jouw-abbymomenten`);

        await stopClock(clock[0].id);

        setUiState({
            ...uiState,
            popUpOpen: false,
        });
    }

    //if clock is made my user
    //nu: pas aan & start
    if (clock[0].startTime && clock[0].creator === userId) {
        return (
            <>
                <div className="popup__text">
                    <p className="h4">Wil je jouw abbymoment stoppen?</p>
                    <p>Als je jouw Abbymoment stopt zal dit bij de voorbije momenten opgeslagen worden.</p>
                </div>
                <div className="popup__btns_container">
                    <Button extraClass="btn__text purple__bg btn__popup" onClick={handleClickClose}>Annuleer</Button>
                    <Button extraClass="btn__red btn__popup" onClick={handleStop}>Stop Abbymoment</Button>
                </div>
            </>
        )
    }

    //Scheduled & now
    //if user is joined
    if (isParticipant && uiState.popUpOpen) {
        return (
            <>
                <div className="popup__text">
                    <p className="h4">Wil je dit Abbymoment verlaten?</p>
                    <p>Als je jouw Abbymoment verlaat zal dit gewoon terug bij alle momenten komen.</p>
                </div>
                <div className="popup__btns_container">
                    <Button extraClass="btn__text green__bg btn__popup" onClick={handleClickClose}>Annuleer</Button>
                    <Button extraClass="btn__red btn__popup" onClick={handleClockLeave}>Verlaat Abbymoment</Button>
                </div>
            </>
        )
    }

    if (isParticipant && uiState.confirmation) {
        return (
            <>
                <div className="popup__text">
                    <p className="h4">Joepie</p>
                    <p>Je neemt deel aan dit Abbymoment.</p>
                </div>
                <div className="popup__btns_container--single">
                    <Button extraClass="btn__text green__bg btn__popup--single" onClick={handleClickClose}>Sluit</Button>
                </div>
            </>
        )
    }
}

export default PopUpDetail;