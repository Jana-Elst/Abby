import { Link } from "react-router";

const ClockItem = ({ clock, id }) => {
    return (
        <li>
            <Link to={`${import.meta.env.BASE_URL}abbymomenten/${id}`}>
                <p>{clock.name}</p>
                <p>{clock.startTime}</p>
            </Link>
        </li>
    )
};

export default ClockItem;