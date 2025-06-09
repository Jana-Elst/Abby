import { Link } from "react-router";
import { useContext, useState } from "react";

//components
import Clock from "../atoms/clock";
import { clockLinkedWithUser, joinClock, leaveClock } from "../../services/data";

//root variables
import { UserContext } from '../../root';

const ButtonClockCard = ({ clock, clockProfile, participants }) => {
    const { userId, setUserId } = useContext(UserContext);

    //change button without refresshing page
    const initialState = clockLinkedWithUser(clock, participants, userId);
    const [stateButton, setStateButton] = useState(initialState);

    //eventhandlers
    const handleClockJoin = async () => {
        await joinClock(userId, clock.id);
        setStateButton(true);
    }

    const handleClockRemove = () => {
        setStateButton(false);
        leaveClock(userId, clock.id);
    }

    //if clock is made my user
    if (clock.creator === userId) {
        if (clock.stopTime) {
            return <button>Herhaal Abbymoment</button>
        }

        if (clock.startTime && !clock.stopTime) {
            return <button>Stop Abbymoment</button>;
        }

        return <button>Start je Abbymoment</button>;
    } else {
        if (clock.private) {
            return <Link to={`${import.meta.env.BASE_URL}abbymomenten/${clock.id}`}>Bekijk Abbymoment</Link>
        }

        if (stateButton) {
            return <button onClick={handleClockRemove}>Verlaat</button>
        }

        if (!stateButton) {
            return <button onClick={handleClockJoin}>Doe mee</button>
        }
    }
};

export default ButtonClockCard;