//react
import { useContext, useState } from 'react'
import Title from "../components/molecules/title";
import ButtonBack from "../components/atoms/buttonBack"
import ButtonDetailClock from "../components/molecules/buttonDetailClock"
import Button from '../components/molecules/button';

import './detailAbbymoments.css';
import share from "../src/assets/share.svg";
import spaceAtelier from "../src/assets/space-atelier.jpg";

//root variables
import { UserContext } from '../context/UserContext';

//functions
import { getDate, getISOLocalString } from "../services/clock";
import { getClock, getClockProfile} from "../services/data";
import Clock from '../components/atoms/clock';
import PopUp from '../components/molecules/popUp';
import PopUpDetail from '../components/molecules/popUpDetail';

import { isCreator, isParticipant, allParticipants } from '../services/dataFilters';

export async function clientLoader({ params }) {
    const id = params.abbymomentId;

    //get data clock
    const clock = await getClock(id);
    const clockProfile = await getClockProfile();
    // const participants = getParticipants(clock, clockProfile) || [];
    return { clock, clockProfile };
}

const DetailAbbymoments = ({ loaderData }) => {
    const { userId } = useContext(UserContext);
    const { clock, clockProfile } = loaderData;

    const participants = allParticipants(clockProfile, clock[0].id)

    const [uiState, setUiState] = useState({
        popUpOpen: false,
        buttonState: participants.length > 0 ?
            participants.includes(userId) ? 'leave ' : 'join' : 'join',
        participants: participants,
        confirmation: false
    });

    const creator = isCreator(clock[0].creator, userId);
    const participant = isParticipant(clock[0].creator, uiState.participants, userId);

    return (
        <>
            <div className='top__bar'>
                <ButtonBack>Terug</ButtonBack>
                {creator && <p className='purple__fg h4'>Maker</p>}
                {!creator && participant && <p className='green__fg h4'>Deelnemer</p>}
            </div>

            <div className='info'>
                <Title extraClass="info__title">{clock[0].name}</Title>

                <div className='info__container'>
                    {
                        clock[0].startTime
                            ? ""
                            : <>
                                <p className='container__date'>                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.09093 2.5H5.7273V3.86364H3.68184H3L3.00002 17.5H3.68184H17.3182H18V3.86364H17.3182H15.2728V2.5H13.9091V3.86364H7.09093V2.5ZM4.36366 7.95455V5.22727H16.6364V7.95455H4.36366ZM4.36366 9.31818V16.1364H16.6364V9.31818H4.36366Z" fill="black" />
                                </svg>{getDate(clock[0].scheduledStartTime).day}</p>
                                <p className='container__time'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="6.75" stroke="black" strokeWidth="1.5" />
                                    <path d="M8 7.99986L8 1.57129" stroke="black" strokeWidth="1.5" />
                                </svg>{`${getDate(clock[0].scheduledStartTime).hour}:${getDate(clock[0].scheduledStartTime).minutes}`}</p>
                            </>
                    }

                    { //show participant (only of you can participate)
                        clock[0].private
                            ? ""
                            : <p className={participants.includes(userId) ? "//voeg hier de juiste kleur toe" : "container__count"}>                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.09093 2.5H5.7273V3.86364H3.68184H3L3.00002 17.5H3.68184H17.3182H18V3.86364H17.3182H15.2728V2.5H13.9091V3.86364H7.09093V2.5ZM4.36366 7.95455V5.22727H16.6364V7.95455H4.36366ZM4.36366 9.31818V16.1364H16.6364V9.31818H4.36366Z" fill="black" />
                            </svg>{participants.length}</p>
                    }

                    <button className='container__share'><img src={share} alt="deel icon" />Deel</button>
                </div>
            </div>
            {
                clock[0].description
                    ? <p className='description'>{clock[0].description}</p>
                    : ""
            }

            {
                clock[0].location === 'Ik weet het nog niet'
                    ? ""
                    : <p className='location'>{clock[0].location}</p>
            }
            <div className='collage'>
                <Clock
                    className={"card__clock"}
                    canvasSize={"120"}
                    clock={clock[0]}
                    clockColors={{ color: "black", bgColor: "white" }}
                />
                <img className='collage__location' src={spaceAtelier} alt="deel icon" />
                <div className='collage__made'>
                    <p className='made__by'>Made By</p>
                    <svg className="made__logo" xmlns="http://www.w3.org/2000/svg" width="624" height="213" viewBox="0 0 624 213" fill="none">
                        <path d="M624.025 0H564.665L538.634 110.174L511.793 0H453.118L515.273 144.65V212.722H561.871V144.688L624.025 0ZM457.636 62.6026C457.636 28.0293 429.601 0 395.018 0H340.836V212.722H408.066C442.65 212.722 470.685 184.693 470.685 150.12C470.685 129.51 460.696 111.267 445.32 99.8639C453.056 89.4545 457.636 76.5658 457.636 62.5995V62.6026ZM417.681 62.6026C417.681 74.616 407.941 84.3526 395.924 84.3526H380.807V40.8557H395.924C407.941 40.8557 417.681 50.5923 417.681 62.6026ZM429.801 150.095C429.801 162.105 420.061 171.845 408.044 171.845H380.807V128.345H408.044C420.061 128.345 429.801 138.085 429.801 150.095ZM301.009 99.867C308.745 89.4576 313.325 76.569 313.325 62.6026C313.325 28.0293 285.29 0 250.706 0H196.525V212.722H263.755C298.339 212.722 326.376 184.693 326.376 150.12C326.376 129.51 316.385 111.267 301.012 99.8639L301.009 99.867ZM273.37 62.6026C273.37 74.616 263.63 84.3526 251.613 84.3526H236.496V40.8557H251.613C263.627 40.8557 273.37 50.5923 273.37 62.6026ZM285.49 150.095C285.49 162.105 275.75 171.845 263.733 171.845H236.493V128.345H263.733C275.747 128.345 285.49 138.085 285.49 150.095ZM126.36 212.725H187.34L122.114 0L66.0878 0.0840972L0.892578 212.725H61.8754L94.1163 39.2827L126.36 212.722V212.725Z" fill="#FFFFFF" />
                    </svg>
                </div>
            </div >
            <div>
                <ButtonDetailClock
                    clock={clock}
                    clockProfile={clockProfile}
                    userId={userId}
                    isParticipant={participant}
                    setUiState={setUiState}
                    uiState={uiState}
                />
            </div>

            {
                //POP-UP
                (uiState.popUpOpen || uiState.confirmation) && (
                    <PopUp
                        setUiState={setUiState}
                        uiState={uiState}
                        className={`${(uiState.popUpOpen || uiState.confirmation) ? 'open' : 'close'}`}>

                        <PopUpDetail
                            clock={clock}
                            setUiState={setUiState}
                            uiState={uiState}
                            isParticipant={participant}
                        />
                    </PopUp>
                )
            }
        </>
    )
};

export default DetailAbbymoments;