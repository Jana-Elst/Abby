//imports reaact
import { useState } from 'react';

//Components
import ClockList from "../components/molecules/clockList";
import ToggleButton from "../components/molecules/toggleButton";
import Title from "../components/molecules/title"
import Button from '../components/molecules/button';
import './abbymoments.css'

import arrow from "../src/assets/arrow-right.svg";

//Functions
import { getActiveClocksUser, getClockProfile, getPastCreator, getPastParticipant, getScheduledCreator, getScheduledParticipant, getUserId } from "../services/data";
import MomentsEmpty from '../components/molecules/momentsEmpty';

export async function clientLoader() {
    const activeClocks = await getActiveClocksUser();
    const scheduledClocksCreator = await getScheduledCreator();
    const scheduledClocksParticipant = await getScheduledParticipant();
    const pastClocksCreator = await getPastCreator();
    const pastClocksParticipant = await getPastParticipant()
    const clockProfile = await getClockProfile();
    const userId = await getUserId();
    return { activeClocks, scheduledClocksCreator, scheduledClocksParticipant, pastClocksCreator, pastClocksParticipant, clockProfile, userId };
}

const YourAbbyMoments = ({ loaderData }) => {
    const { activeClocks, scheduledClocksCreator, scheduledClocksParticipant, pastClocksCreator, pastClocksParticipant, clockProfile, userId } = loaderData;

    //set the states
    const [state, setState] = useState({
        toggle: "Nu",
        page: "yourMoments"
    });

    const contents = {
        name: 'toggleYourMoments',
        values: ["Afgelopen", "Nu", "Gepland"]
    }

    return (
        <>
            <div className='container'>
                <Title><span className='purple__fg'>Jouw</span> Abby- momenten</Title>
                <ToggleButton
                    contents={contents}
                    setState={setState}
                    state={state}
                    colourClass={"toggleButton__item--purple"}
                />
            </div>
            {/*show different things depading on state*/}
            <div className='your__container'>
                {
                    state.toggle === 'Nu'
                        ? <>
                            {/* Active moment */}
                            {
                                //check if there is a active moment
                                activeClocks
                                    ? (
                                        <>
                                            <h3 className='moments__subtitle h4'>{activeClocks[0].includes(userId) ? "Jouw moment is nu bezig" : "Je neemt deel aan een lopend moment"}</h3>

                                            <div className='container container__moments'>
                                                <p>hier komt clockCard = lopend</p>
                                            </div>
                                        </>
                                    ) : (
                                        //show empty state if there are no active clocks
                                        <MomentsEmpty state={state} />
                                    )
                            }

                        </>
                        : state.toggle === 'Gepland'
                            ? <>
                                {/* scheduled moments */}
                                {/* check if their are scehduled clocks */}
                                {scheduledClocksCreator && scheduledClocksParticipant
                                    ? (
                                        <>
                                            {scheduledClocksCreator
                                                && <>
                                                    <h3 className='moments__subtitle h4'>Jouw geplande momenten</h3>
                                                    <div className='container container__moments'>
                                                        <ClockList clocks={scheduledClocksCreator} state={state} clockProfile={clockProfile} />
                                                    </div>
                                                </>

                                            }

                                            {scheduledClocksParticipant
                                                && <>
                                                    <h3 className='moments__subtitle h4'>Momenten waar je aan deelneemt</h3>
                                                    <div className='container container__moments'>
                                                        <ClockList clocks={scheduledClocksParticipant} state={state} clockProfile={clockProfile} />
                                                    </div>
                                                </>
                                            }

                                            <div className='container'>
                                                <Button extraClass="btn__text moment__btn yellow__bg btn__arrow" link={"maak-een-abbymoment"} >Creëer een niew moment <img className='btn__icon' src={arrow} alt="een pijl" /></Button>
                                            </div>
                                        </>
                                    ) : (
                                        //show empty state if there are no scheduled clocks
                                        <MomentsEmpty state={state} />

                                    )
                                }
                            </>
                            : <>
                                {/* past moments */}
                                {/* check if their are past clocks */}
                                {pastClocksCreator && pastClocksParticipant
                                    ? (
                                        <>
                                            {pastClocksCreator
                                                && <>
                                                    <h3 className='moments__subtitle h4'>Jouw afgelopen momenten</h3>
                                                    <div className='container container__moments'>
                                                        <ClockList clocks={pastClocksCreator} state={state} clockProfile={clockProfile} />
                                                    </div>
                                                </>
                                            }

                                            {
                                                pastClocksParticipant
                                                && <>
                                                    <h3 className='moments__subtitle h4'>Afgelopen momenten waar je bij was</h3>
                                                    <div className='container container__moments'>
                                                        <ClockList clocks={pastClocksParticipant} state={state} clockProfile={clockProfile} />
                                                    </div>
                                                </>
                                            }
                                            <div className='container'>
                                                <Button extraClass="btn__text moment__btn yellow__bg btn__arrow" link={"maak-een-abbymoment"} >Creëer een nieuw moment <img className='btn__icon' src={arrow} alt="een pijl" /></Button>
                                            </div>
                                        </>
                                    ) : (
                                        //show empty state if there are no past clocks
                                        <MomentsEmpty state={state} />
                                    )
                                }
                            </>
                }
            </div>
        </>

    )
};

export default YourAbbyMoments;