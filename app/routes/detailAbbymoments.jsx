//react
import { useContext, useState } from 'react'
import Title from "../components/molecules/title";
import ButtonBack from "../components/atoms/buttonBack"
import ButtonDetailClock from "../components/molecules/buttonDetailClock"
import Button from '../components/molecules/button';

//root variables
import { UserContext } from '../context/UserContext';

//functions
import { getTime } from "../services/clock";
import { getClock, getClockProfile, getParticipants, clockLinkedWithUser } from "../services/data";
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
            <div>
                <ButtonBack>Terug</ButtonBack>
                {/* show 'maker' or 'participant' */}
                {creator && <p>Maker</p>}
                {!creator && participant && <p>Deelnemer</p>}

                <Title>{clock[0].name}</Title>

                {
                    // show date and time of scheduled
                    !clock[0].startTime
                    && <>
                        <p>{getTime(clock[0].scheduledStartTime).date}</p>
                        <p>{getTime(clock[0].scheduledStartTime).time}</p>
                    </>
                }

                {
                    // show description if description
                    clock[0].description
                    && <p>{clock[0].description}</p>
                }

                { //show total participants
                    !clock[0].private
                    && <p className={isParticipant ? "//voeg hier de juiste kleur toe" : ""}>{participants.length}</p>
                }

                <Button>Deel</Button>

                {
                    clock[0].location !== 'Ik weet het nog niet'
                    && <p>{clock[0].location}</p>
                }

                <Clock
                    className={"card__clock"}
                    canvasSize={"120"}
                    clock={clock[0]}
                    clockColors={{ color: "black", bgColor: "white" }}
                />

                <p>IMG</p>

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