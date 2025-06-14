import { useContext } from "react";

//components
import Button from "./button";

//root variables
import { UserContext } from '../../context/UserContext';

//functions
import { getTime } from "../../services/clock";
import { getDateNow } from "../../services/data";
import { joinClock, leaveClock, stopClock } from "../../services/data";

const ButtonDetailClock = ({ clock, isParticipant, setUiState, uiState }) => {
    const { userId } = useContext(UserContext);

    let scheduledDate = clock[0].scheduledStartTime;
    scheduledDate = new Date(scheduledDate).toISOString("en-US", { timeZone: "Europe/Amsterdam" }).split('T')[0];


    // Event Handlers
    const handleClockJoin = async () => {
        await joinClock(userId, clock[0].id);
        setUiState({
            ...uiState,
            popUpOpen: true,
            participants: [...uiState.participants, userId]
        });
    }

    const handleClockLeave = async () => {
        setUiState({
            ...uiState,
            popUpOpen: true
        });
        await leaveClock(userId, clock[0].id);
    }

    const handleStop = async () => {
        setUiState({
            ...uiState,
            popUpOpen: true
        });

        await stopClock(clock.id);
    }

    const handleStart = () => {
    }

    //--- toevoegen disabled als er aan klok lopende is + pop-up
    //if clock is made my user
    if (clock[0].creator === userId) {
        //herhaal: herhaal Abbymoment
        if (clock[0].stopTime) {
            return (
                <div>
                    <button>Herhaal je moment</button>
                </div>
            )
        }

        //nu: pas aan & start
        if (clock[0].startTime) {
            return (
                <div>
                    <button>Pas aan</button>
                    <button>Stop moment</button>
                </div>
            )
        }

        // later-today: pas aan & stop
        if (scheduledDate === getDateNow()) {
            return (
                <div>
                    <button>Pas aan</button>
                    <button>Start</button>
                </div>
            )
        }

        //never started
        if (scheduledDate < getDateNow()) {
            return (
                <div>
                    <button>Herhaal Abbymoment</button>
                </div>
            )
        }

        //later: pas aan & Je kan je moment start op xxx
        if (clock[0].scheduledStartTime) {
            console.log('Ik ben ingepland');
            return (
                <div>
                    <button>Pas aan</button>
                    <button>Start je moment vanaf {getTime(clock[0].scheduledStartTime).date}</button>
                </div>
            )
        }
    }

    //if user joined moment
    else {
        //past
        if (scheduledDate < getDateNow() || clock[0].stopTime) {
            return <button>Dit moment kan je niet herhalen, want je was een deelnemer.</button>
        }

        //Scheduled & now
        else {
            //if user is joined
            if (isParticipant) {
                return <Button onClick={handleClockLeave}>Verlaat</Button>
            } else {
                if (userId) {
                    return <Button onClick={handleClockJoin}>Doe mee</Button>
                } else {
                    return <Button link={'log-in'} onClick={handleClockJoin}>Log in om deel te nemen aan dit moment</Button>
                }
            }
        }
    }
}

export default ButtonDetailClock;