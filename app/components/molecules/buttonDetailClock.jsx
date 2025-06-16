import { useContext } from "react";
import { useNavigate } from "react-router"

//components
import Button from "./button";

//root variables
import { UserContext } from '../../context/UserContext';
import { FormFlowContext } from '../../context/FormFlowContext';

//functions
import { getTime } from "../../services/clock";
import { getDateNow } from "../../services/data";
import { joinClock, leaveClock, stopClock } from "../../services/data";

import "./buttonDetailClock.css"

const ButtonDetailClock = ({ clock, isParticipant, setUiState, uiState }) => {
    const { userId } = useContext(UserContext);
    const { setFlowForm } = useContext(FormFlowContext);
    const navigate = useNavigate();

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
                <Button extraClass="btn__detail btn__text btn__square--left purple__bg" onClick={handleRestart}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M16.9856 14.8436H2.925L5.7325 12.0348L5.26125 11.5636L1.67188 15.1536L5.26125 18.743L5.7325 18.2717L2.97063 15.5092H17.6525V9.51172H16.9862L16.9856 14.8436Z" fill="black" stroke="black" stroke-width="0.5" />
                    <path d="M2.995 6.17969H17.05L14.265 8.96531L14.7362 9.43656L18.325 5.84781L14.7356 2.25781L14.2644 2.72906L17.0481 5.51406H2.32812V11.5116H2.99437L2.995 6.17969Z" fill="black" stroke="black" stroke-width="0.5" />
                </svg>Herhaal Abbymoment</Button>
            )
        }

        //nu: pas aan & start
        if (clock[0].startTime) {
            return (
                <div className="btn__detail btn__detail--split">
                    <button className="btn__square btn__square--left btn__edit yellow__bg btn__text"> <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                        <path d="M15.56 0.280029L5.75 9.26003V14.06H9.71L19.38 4.34003L15.56 0.280029ZM9.06 12.7H7.25V9.83003L7.33 9.75003L15.55 2.08003L17.41 4.36003L17.25 4.52003L9.06 12.7ZM18.75 9.90003V17.36H2.25V1.94003H10.25V0.580029H0.75V18.72H20.25V9.90003H18.75Z" fill="black" />
                    </svg> Pas aan </button>
                    <Button extraClass="btn__text btn__square--left btn__right purple__bg " onClick={handleStop}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                            <rect x="1.675" y="2.175" width="16.65" height="16.65" stroke="black" stroke-width="1.35" />
                            <path d="M14.5 5.99951L5.49995 14.9996" stroke="black" stroke-width="1.1251" />
                            <path d="M14.5 15L5.50005 6.00005" stroke="black" stroke-width="1.12499" />
                        </svg>Stop moment</Button>
                </div>
            )
        }

        // later-today: pas aan & stop
        if (scheduledDate === getDateNow()) {
            return (
                <div className="btn__detail btn__detail--split">
                    <button className="btn__square btn__square--left btn__edit yellow__bg btn__text"> <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                        <path d="M15.56 0.280029L5.75 9.26003V14.06H9.71L19.38 4.34003L15.56 0.280029ZM9.06 12.7H7.25V9.83003L7.33 9.75003L15.55 2.08003L17.41 4.36003L17.25 4.52003L9.06 12.7ZM18.75 9.90003V17.36H2.25V1.94003H10.25V0.580029H0.75V18.72H20.25V9.90003H18.75Z" fill="black" />
                    </svg> Pas aan </button>
                    <Button extraClass="btn__right btn__square--left btn__text purple__bg" onClick={handleStart}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="21" viewBox="0 0 16 21" fill="none">
                        <path d="M1.40947 2.11496L14.5859 10.5L1.40946 18.885L1.40947 2.11496Z" stroke="black" stroke-width="1.41176" />
                    </svg>
                    Start</Button>
                </div>
            )
        }

        //never started
        if (scheduledDate < getDateNow()) {
            return (
                <Button extraClass="btn__detail btn__text btn__square--left purple__bg" onClick={handleRestart}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M16.9856 14.8436H2.925L5.7325 12.0348L5.26125 11.5636L1.67188 15.1536L5.26125 18.743L5.7325 18.2717L2.97063 15.5092H17.6525V9.51172H16.9862L16.9856 14.8436Z" fill="black" stroke="black" stroke-width="0.5" />
                    <path d="M2.995 6.17969H17.05L14.265 8.96531L14.7362 9.43656L18.325 5.84781L14.7356 2.25781L14.2644 2.72906L17.0481 5.51406H2.32812V11.5116H2.99437L2.995 6.17969Z" fill="black" stroke="black" stroke-width="0.5" />
                </svg>Herhaal Abbymoment</Button>
            )
        }

        //later: pas aan & Je kan je moment start op xxx
        if (clock[0].scheduledStartTime) {
            console.log('Ik ben ingepland');
            return (
                <div className="btn__detail btn__detail--split">
                    <button className="btn__square btn__square--left btn__edit yellow__bg"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                        <path d="M15.56 0.280029L5.75 9.26003V14.06H9.71L19.38 4.34003L15.56 0.280029ZM9.06 12.7H7.25V9.83003L7.33 9.75003L15.55 2.08003L17.41 4.36003L17.25 4.52003L9.06 12.7ZM18.75 9.90003V17.36H2.25V1.94003H10.25V0.580029H0.75V18.72H20.25V9.90003H18.75Z" fill="black" />
                    </svg>Pas aan</button>
                    <p className="btn__right">Start je moment vanaf {getTime(clock[0].scheduledStartTime).date}</p>
                </div>
            )
        }
    }

    //if user joined moment
    else {
        //past
        if (scheduledDate < getDateNow() || clock[0].stopTime) {
            return <button className="btn__detail" >Dit moment kan je niet herhalen, want je was een deelnemer.</button>
        }

        //Scheduled & now
        else {
            //if user is joined
            console.log('isPart', isParticipant);
            if (isParticipant) {
                return <Button extraClass="btn__detail btn__square btn__text green__bg" onClick={handleClockLeave}>Verlaat
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <rect x="1.675" y="2.175" width="16.65" height="16.65" stroke="black" stroke-width="1.35" />
                        <path d="M14.5 5.99951L5.49995 14.9996" stroke="black" stroke-width="1.1251" />
                        <path d="M14.5 15L5.50005 6.00005" stroke="black" stroke-width="1.12499" />
                    </svg>
                </Button>
            } else {
                if (userId) {
                    return <Button extraClass="btn__detail btn__square btn__text green__bg" onClick={handleClockJoin}>Doe mee
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                            <rect x="1.675" y="2.175" width="16.65" height="16.65" stroke="black" stroke-width="1.35" />
                        </svg>
                    </Button>
                } else {
                    return <Button extraClass="btn__detail btn__text yellow__bg" link={'log-in'} onClick={handleClockJoin}>Log in om deel te nemen aan dit moment</Button>
                }
            }
        }
    }
}

export default ButtonDetailClock;