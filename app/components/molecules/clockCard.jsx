import { Link } from "react-router";
import Clock from "../atoms/clock";
import { getTime } from "../../services/clock";
import ButtonClockCard from "./buttonClockCard";

const ClockCard = ({ clock, clockProfile }) => {
    let participants = []

    const totalParticipants = () => {
        console.log(clockProfile);
        participants = clockProfile.filter(cp => cp.clock_id === clock.id);
        return participants;
    }

    return (
        <>
            <li>
                <Link to={`${import.meta.env.BASE_URL}abbymomenten/${clock.id}`}>
                    <p>{clock.name}</p>
                    <p>{clock.location}</p>
                    {
                        clock.private
                            ? ""
                            : <p>{totalParticipants().length}</p>
                    }
                    {
                        clock.abbyMoment
                            ? <p>ABBYMOMENT</p>
                            : ""
                    }
                    {
                        clock.startTime
                            ? ""
                            : <p>{getTime(clock.scheduledStartTime).time}</p>
                    }
                    {
                        <p>{getTime(clock.scheduledStartTime).date}</p>
                    }
                    {/* <Clock size={60} startTime={clock.startTime} active={true}/> */}
                </Link>
            </li>
            <ButtonClockCard clock={clock} participants={participants}/>
        </>
    )
};

export default ClockCard;