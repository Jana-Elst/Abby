import { Link } from "react-router";
import { useContext, useState } from "react";

//components
import Clock from "../atoms/clock";
import { clockLinkedWithUser, joinClock, leaveClock, stopClock } from "../../services/data";

//root variables
import { UserContext } from '../../root';

const ButtonClockCard = ({ clock, clockProfile, participants }) => {
    const { userId, setUserId } = useContext(UserContext);

    //change button without refresshing page
    const initialState = clockLinkedWithUser(clock, participants, userId);
    const [stateButton, setStateButton] = useState(initialState);

    //eventhandlers
    const handleClockJoin = async () => {
        setStateButton('leave');
        await joinClock(userId, clock.id);
    }

    const handleClockRemove = async () => {
        setStateButton('join');
        await leaveClock(userId, clock.id);
    }

    const handleStop = async () => {
        setStateButton('');
        await stopClock(clock.id);
    }

    const handleStart = () => {
        setStateButton('stop');
    }

    //if clock is made my user
    if (clock.creator === userId) {
        if (clock.stopTime) {
            return <button>Herhaal Abbymoment</button>
        }

        if (clock.startTime && !clock.stopTime) {
            return <button onClick={handleStop}>Stop Abbymoment</button>;
        }

        return <button onClick={handleStart}>Start je Abbymoment</button>;
    } else {
        if (clock.private) {
            return <Link to={`${import.meta.env.BASE_URL}abbymomenten/${clock.id}`}>Bekijk Abbymoment</Link>
        }

        if (stateButton === 'leave') {
            return <button onClick={handleClockRemove}>Verlaat</button>
        }

        if (!stateButton === 'join') {
            return <button onClick={handleClockJoin}>Doe mee</button>
        }
    }
};

export default ButtonClockCard;