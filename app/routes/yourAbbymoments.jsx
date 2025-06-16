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
    const userId = await getUserId();
    const activeClocks = await getActiveClocksUser() || [] ;
    const scheduledClocksCreator = await getScheduledCreator()|| [];
    const scheduledClocksParticipant = await getScheduledParticipant()|| [];
    const pastClocksCreator = await getPastCreator()|| [];
    const pastClocksParticipant = await getPastParticipant()|| [];
    const clockProfile = await getClockProfile()|| [];

    return {
        activeClocks,
        scheduledClocksCreator,
        scheduledClocksParticipant,
        pastClocksCreator,
        pastClocksParticipant,
        clockProfile,
        userId };
}

const YourAbbyMoments = ({ loaderData }) => {
    const { activeClocks,
        scheduledClocksCreator,
        scheduledClocksParticipant,
        pastClocksCreator,
        pastClocksParticipant,
        clockProfile,
        userId } = loaderData;

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
                                activeClocks.length > 0
                                    ? (
                                        <>
                                            {/* <h3 className='moments__subtitle h4'>{activeClocks[0].includes(userId) ? "Jouw moment is nu bezig" : "Je neemt deel aan een lopend moment"}</h3> */}

                                            <div className='container container__moments'>
                                                <ClockList clocks={activeClocks} clockProfile={clockProfile} state={state} />
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
                                {scheduledClocksCreator.length > 0 || scheduledClocksParticipant.length > 0
                                    ? (
                                        <>
                                            {scheduledClocksCreator.length > 0
                                                && <>
                                                    <h3 className='moments__subtitle h4'>Jouw geplande momenten</h3>
                                                    <div className='container container__moments'>
                                                        <ClockList clocks={scheduledClocksCreator} state={state} clockProfile={clockProfile} />
                                                    </div>
                                                </>

                                            }

                                            {scheduledClocksParticipant.length > 0
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
                                {pastClocksCreator.length > 0 || pastClocksParticipant.length > 0
                                    ? (
                                        <>
                                            {pastClocksCreator.length > 0
                                                && <>
                                                    <h3 className='moments__subtitle h4'>Jouw afgelopen momenten</h3>
                                                    <div className='container container__moments'>
                                                        <ClockList clocks={pastClocksCreator} state={state} clockProfile={clockProfile} />
                                                    </div>
                                                </>
                                            }

                                            {
                                                pastClocksParticipant.length > 0
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