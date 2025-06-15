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

export async function clientLoader({ params }) {
    const id = params.abbymomentId;

    //get data clock
    const clock = await getClock(id);
    const clockProfile = await getClockProfile();
    const participants = getParticipants(clock, clockProfile) || [];
    console.log(clockProfile);
    return { clock, clockProfile, participants };

}
const DetailClock = ({ loaderData }) => {
    const { userId } = useContext(UserContext);
    const { clock, clockProfile, participants } = loaderData;
    const [uiState, setUiState] = useState({
        popUpOpen: false,
        buttonState: participants.length > 0 ?
            participants.includes(userId) ? 'leave ' : 'join' : 'join',
        participants: participants
    });

    const isCreator = userId === clock[0].creator;
    console.log(participants);
    const isParticipant = uiState.participants.length > 0 ? uiState.participants.includes(userId) : false

    return (
        <>
            <div>
                <ButtonBack>Terug</ButtonBack>
                {/* show 'maker' or 'participant' */}
                {isCreator && <p>Maker</p>}
                {!isCreator && isParticipant && <p>Deelnemer</p>}

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
                    && <p className={isParticipant ? "green__bg" : ""}>{participants.length}</p>
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
                    isParticipant={isParticipant}
                    setUiState={setUiState}
                    uiState={uiState}
                />
            </div>

            {
                //POP-UP
                uiState.popUpOpen && (
                    <PopUp
                        setUiState={setUiState}
                        uiState={uiState}
                        className={`${uiState.popUpOpen ? 'open' : 'close'}`}>

                        <PopUpDetail
                            clock={clock}
                            setUiState={setUiState}
                            uiState={uiState}
                            isParticipant={isParticipant}
                        />
                    </PopUp>
                )
            }
        </>
    )
};

export default DetailClock;