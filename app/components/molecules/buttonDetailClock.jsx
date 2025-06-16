import { useContext } from "react";
import { useNavigate } from "react-router"

//components
import Button from "./button";

//root variables
import { UserContext } from '../../context/UserContext';
import { FormFlowContext } from '../../context/FormFlowContext';

//functions
import { getDate, getISOLocalString } from "../../services/clock";
import { joinClock } from "../../services/data";

const ButtonDetailClock = ({ clock, isParticipant, setUiState, uiState }) => {
    const { userId } = useContext(UserContext);
    const { setFlowForm } = useContext(FormFlowContext);
    const navigate = useNavigate();

    const time = getDate(clock[0].scheduledStartTime);
    console.log(time);

    let scheduledDate = clock[0].scheduledStartTime;
    scheduledDate = new Date(scheduledDate).toISOString("en-US", { timeZone: "Europe/Amsterdam" }).split('T')[0];

    // Event Handlers
    const handleClockJoin = async () => {
        await joinClock(userId, clock[0].id);
        setUiState({
            ...uiState,
            confirmation: true,
            participants: [...uiState.participants, userId],
        });
    }

    const handleClockLeave = async () => {
        setUiState({
            ...uiState,
            popUpOpen: true
        });
    }

    const handleStop = async () => {
        setUiState({
            ...uiState,
            popUpOpen: true,
            confirmation: false,
        });
    }

    const handleStart = () => {
        console.log('starttt')
        setFlowForm('startScheduled');
        navigate(`${import.meta.env.BASE_URL}maak-een-abbymoment/formulier`, {
            state: { clock: clock }
        });
    }

    const handleRestart = () => {
        setFlowForm('restartMoment');
        navigate(`${import.meta.env.BASE_URL}maak-een-abbymoment/formulier`, {
            state: { clock: clock }
        });
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
                    <Button onClick={handleStop}>Stop moment</Button>
                </div>
            )
        }

        // later-today: pas aan & stop
        if (scheduledDate === getISOLocalString()) {
            return (
                <div>
                    <button>Pas aan</button>
                    <Button onClick={handleStart}>Start</Button>
                </div>
            )
        }

        //never started
        if (scheduledDate < getISOLocalString()) {
            return (
                <div>
                    <Button onClick={handleRestart}>Herhaal Abbymoment</Button>
                </div>
            )
        }

        //later: pas aan & Je kan je moment start op xxx
        if (clock[0].scheduledStartTime) {
            console.log('Ik ben ingepland');
            return (
                <div>
                    <button>Pas aan</button>
                    <p>Start je moment vanaf {getDate(clock[0].scheduledStartTime).date}</p>
                </div>
            )
        }
    }

    //if user joined moment
    else {
        //past
        if (scheduledDate < getISOLocalString() || clock[0].stopTime) {
            return <button>Dit moment kan je niet herhalen, want je was een deelnemer.</button>
        }

        //Scheduled & now
        else {
            //if user is joined
            console.log('isPart', isParticipant);
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