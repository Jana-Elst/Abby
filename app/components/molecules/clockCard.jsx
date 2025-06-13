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

const ClockCard = ({ clock, clockProfile}) => {
    const { userId } = useContext(UserContext);
    const participants = clockProfile.filter(cp => cp.clock_id === clock.id).map(cp => cp.profile_id);

    return (
        <>
            <li className="card">
                <Link to={`${import.meta.env.BASE_URL}abbymomenten/${clock.id}`}>
                    <p className="card__name">{clock.name}</p>

                    { //show 'maker' or 'participant'
                        userId === clock.creator
                        && <p className="card__type purple__bg">Maker</p>
                    }
                    {
                    participants.includes(userId)
                    && <p className="card__type green__bg">Deelnemer</p>
                    }

                    { //show start time (only if clock is scheduled)
                        clock.startTime
                            ? ""
                            : (<div className="card__when">
                                <div className="card__time">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <circle cx="8" cy="8" r="6.75" stroke="black" strokeWidth="1.5" />
                                        <path d="M8 7.99986L8 1.57129" stroke="black" strokeWidth="1.5" />
                                    </svg>
                                    <p>{getTime(clock.scheduledStartTime).time}</p>
                                </div>
                                <div className="card__date">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.09093 2.5H5.7273V3.86364H3.68184H3L3.00002 17.5H3.68184H17.3182H18V3.86364H17.3182H15.2728V2.5H13.9091V3.86364H7.09093V2.5ZM4.36366 7.95455V5.22727H16.6364V7.95455H4.36366ZM4.36366 9.31818V16.1364H16.6364V9.31818H4.36366Z" fill="black" />
                                    </svg>
                                    <p>{getTime(clock.scheduledStartTime).date}</p>
                                </div>
                            </div>)
                    }

                    { //show participant (only of you can participate)
                        clock.private
                            ? ""
                            : <p className="card__participants">{participants.length}</p>
                    }

                    {/* <Clock size={60} startTime={clock.startTime} active={true}/> */}
                    <ButtonClockCard userId={userId} clock={clock} participants={participants} />
                </Link>
            </li>
        </>
    )
};

export default ClockCard;