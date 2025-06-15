//react imports
import { useContext } from "react";

//root variables
import { UserContext } from '../../context/UserContext';

//components
import ClockCard from "./clockCard";
import MomentsEmpty from "./momentsEmpty";

import './clockList.css';

const ClockList = ({ clocks = [], clockProfile, state }) => {
    return (
        <div>
            {
                clocks ? (
                    <ul className="clocks">
                        {clocks.map((clock) => (
                            <ClockCard key={clock.id} clock={clock} clockProfile={clockProfile} state={state} />
                        ))}
                    </ul>
                ) : (
                    <MomentsEmpty state={state} />
                )
            }
        </div>
    )
}
 export default ClockList;
