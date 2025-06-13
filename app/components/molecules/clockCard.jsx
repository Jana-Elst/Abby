//react
import { Link } from "react-router";
import { useContext } from "react";

//root variables
import { UserContext } from '../../context/UserContext';

//components
import Clock from "../atoms/clock";
import ButtonClockCard from "./buttonClockCard";

//functions
import { getTime } from "../../services/clock";
import { getParticipants } from "../../services/data"

const ClockCard = ({ clock, clockProfile, state }) => {
    const { userId } = useContext(UserContext);
    const participants = getParticipants(clock, clockProfile);

    return (
        <>
            <li>
                <Link to={`${import.meta.env.BASE_URL}abbymomenten/${clock.id}`}>
                    <p>{clock.name}</p>

                    { //show 'maker' or 'participant'
                        userId === clock.creator
                            ? <p>Maker</p>
                            : participants.includes(userId)
                                ? <p>Deelnemer</p>
                                : ""

                    }

                    { //show participant (only of you can participate)
                        clock.private
                            ? ""
                            : <p>{participants.length}</p>
                    }

                    { //show start time (only if clock is scheduled)
                        clock.startTime
                            ? ""
                            : <p>{getTime(clock.scheduledStartTime).time}</p>
                    }

                    { //show date
                        <p>{getTime(clock.scheduledStartTime).date}</p>
                    }

                    {/* <Clock size={60} startTime={clock.startTime} active={true}/> */}
                    <ButtonClockCard userId={userId} clock={clock} participants={participants} state={state}/>
                </Link>
            </li>
        </>
    )
};

export default ClockCard;