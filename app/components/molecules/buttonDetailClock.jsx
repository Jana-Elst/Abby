import { Link } from "react-router";
import { useContext, useState } from "react";

//components
import Clock from "../atoms/clock";
import { clockLinkedWithUser, joinClock, leaveClock, stopClock } from "../../services/data";

//root variables
import { UserContext } from '../../context/UserContext';

//functions
import { getTime } from "../../services/clock";
import { getDateNow } from "../../services/data";

const ButtonDetailClock = ({ clock, clockProfile, participants }) => {
    const { userId, setUserId } = useContext(UserContext);
    let scheduledDate = clock[0].scheduledStartTime;
    scheduledDate = new Date(scheduledDate).toISOString("en-US", { timeZone: "Europe/Amsterdam" }).split('T')[0];

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
    // if (clock.creator === userId) {
    //     if (clock.stopTime) {
    //         return <button>Herhaal Abbymoment</button>
    //     }

    //     if (clock.startTime && !clock.stopTime) {
    //         return <button onClick={handleStop}>Stop Abbymoment</button>;
    //     }

    //     return <button onClick={handleStart}>Start je Abbymoment</button>;
    // } else {
    //     if (clock.private) {
    //         return <Link to={`${import.meta.env.BASE_URL}abbymomenten/${clock.id}`}>Bekijk Abbymoment</Link>
    //     }

    //     if (stateButton === 'leave') {
    //         return <button onClick={handleClockRemove}>Verlaat</button>
    //     }

    //     if (!stateButton === 'join') {
    //         return <button onClick={handleClockJoin}>Doe mee</button>
    //     }
    // }

    //--- toevoegen disabled als er aan klok lopende is + pop-up
    //if clock is made my user
    if (clock[0].creator === userId) {
        console.log('Hey maker');
        //herhaal: herhaal Abbymoment
        if (clock[0].stopTime) {
            console.log('Ik ben gestop');
            return (
                <div>
                    <button>Pas aan</button>
                    <button>Start je moment vanaf {getTime(clock[0].scheduledStartTime).date}</button>
                </div>
            )
        }

        //nu: pas aan & start
        if (clock[0].startTime) {
            console.log('Ik ben gestart');
            return (
                <div>
                    <button>Pas aan</button>
                    <button>Stop moment</button>
                </div>
            )
        }

        // later-today: pas aan & stop
        if (scheduledDate === getDateNow()) {
            console.log(scheduledDate);
            console.log(getDateNow());
            return (
                <div>
                    <button>Pas aan</button>
                    <button>Start</button>
                </div>
            )
        }

        //never started
        if (scheduledDate < getDateNow()) {
            console.log('Ik ben nooit opgestart');
            console.log(getDateNow());
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
            if (participants.includes(userId)) {
                return <button>Doe mee</button>
            } else {
                return <button>Verlaat</button>
            }
        }
    }
}

export default ButtonDetailClock;