import { Link } from "react-router";
import Clock from "../atoms/clock";

const ClockItem = ({ clock, id }) => {
    return (
        <li>
            <Link to={`${import.meta.env.BASE_URL}abbymomenten/${id}`}>
                <p>{clock.name}</p>
                <p>{clock.startTime}</p>
                {/* <Clock size={60} startTime={clock.startTime} active={true}/> */}
            </Link>
        </li>
    )
};

export default ClockItem;