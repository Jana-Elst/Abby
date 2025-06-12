//react imports
import { useContext } from "react";

//root variables
import { UserContext } from '../../context/UserContext';

//components
import ClockCard from "./clockCard";
import MomentsEmpty from "./momentsEmpty";

const ClockList = ({ clocks = [], clockProfile, state }) => {
    const { userId } = useContext(UserContext);

    //My clocks
    if (state === 'Mijn Abbymomenten') {
        const myClockIds = clockProfile
            .filter(cp => cp.profile_id === userId)
            .map(cp => cp.clock_id);
        const myClocks = clocks.filter(clock => myClockIds.includes(clock.id))

        return (
            <div>
                {
                    clocks.length ? (
                        <ul>
                            {myClocks.map((clock) => (
                                <ClockCard key={clock.id} clock={clock} clockProfile={clockProfile} state={state}/>
                            ))}
                        </ul>
                    ) : (
                        <p> Je hebt nog geen klokken </p>
                    )
                }
            </div>
        )
    }

    return (
        <div>
            {clocks.length ? (
                <ul>
                    {clocks.map((clock) => (
                        <ClockCard key={clock.id} clock={clock} clockProfile={clockProfile} state={state}/>
                    ))}
                </ul>
            ) : (
                <MomentsEmpty state={state} />
            )}

        </div>
    )
};

export default ClockList;