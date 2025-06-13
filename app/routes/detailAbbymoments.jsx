//react
import { useContext } from 'react'
import Title from "../components/molecules/title";
import Button from "../components/molecules/button"
import ButtonBack from "../components/atoms/buttonBack"
import ButtonDetailClock from "../components/molecules/buttonDetailClock"

//root variables
import { UserContext } from '../context/UserContext';

//functions
import { getTime } from "../services/clock";
import { getClock, getClockProfile, getParticipants } from "../services/data";

export async function clientLoader({ params }) {
    const id = params.abbymomentId;

    //get data clock
    const clock = await getClock(id);
    const clockProfile = await getClockProfile();
    const participants = getParticipants(clock, clockProfile);
    console.log(clockProfile);
    return { clock, clockProfile, participants };
}


const DetailClock = ({ loaderData }) => {
    const { userId } = useContext(UserContext);
    const { clock, clockProfile, participants } = loaderData;    

    return (
        <>
            {/* @henri als je een kleur toevoegd aan deze terugbalk roep mij even */}
            <div className={""}>
                <ButtonBack>Terug</ButtonBack>

                { //show 'maker' or 'participant'
                    userId === clock[0].creator
                        ? <p>Maker</p>
                        : participants.includes(userId)
                            ? <p>Deelnemer</p>
                            : ""

                }
            </div>

            <Title>{clock[0].name}</Title>

            {
                // show date and time of scheduled
                clock[0].startTime
                    ? ""
                    : <>
                        <p>{getTime(clock[0].scheduledStartTime).date}</p>
                        <p>{getTime(clock[0].scheduledStartTime).time}</p>
                    </>
            }

            {
                // show description if description
                clock[0].description
                    ? <p>{clock[0].description}</p>
                    : ""
            }

            { //show total participants
                clock[0].private
                    ? ""
                    : <p className={participants.includes(userId) ? "//voeg hier de juiste kleur toe" : ""}>{participants.length}</p>
            }

            <button>Deel</button>

            {
                clock[0].location === 'Ik weet het nog niet'
                    ? ""
                    : <p>{clock[0].location}</p>
            }

            <p>KLOK</p>
            <p>IMG</p>

            <ButtonDetailClock clock={clock} clockProfile={clockProfile} userId={userId} participants={participants} />

            {/* {
                clock.private
                    ? (<button>Je kan niet meedoen aan dit Abbymoment</button>)
                    : !clock[0].private && userId
                        ? (<button>Doe mee met dit Abbymoment</button>)
                        : <Button link={'log-in'}>Log-in</Button>
            } */}
        </>
    )
};

export default DetailClock;