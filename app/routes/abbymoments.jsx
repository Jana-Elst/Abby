//react
import { useState } from 'react';
import { useContext } from "react";

//root variables
import { UserContext } from '../context/UserContext';

//components
import ClockList from "../components/molecules/clockList";
import Filter from "../components/molecules/filter";
import ToggleButton from "../components/molecules/toggleButton";
import Title from "../components/molecules/title"
import Button from '../components/molecules/button';

//functions
import { getActiveClocksUser, getOtherActiveClocks, getScheduledClocks, getClockProfile } from "../services/data";

//style
import './abbymoments.css'
import MomentsEmpty from '../components/molecules/momentsEmpty';

export async function clientLoader() {
    const activeClocksUser = await getActiveClocksUser() || [];
    const activeClocksOthers = await getOtherActiveClocks() || [];
    const scheduledClocks = await getScheduledClocks() || [];
    const clockProfile = await getClockProfile() || [];

    return { clockProfile, activeClocksOthers, scheduledClocks, activeClocksUser };
}

const Abbymoments = ({ loaderData }) => {
    const { clockProfile, activeClocksOthers, scheduledClocks, activeClocksUser } = loaderData;

    //set the states
    const [state, setState] = useState({
        toggle: "Nu bezig",
        page: "allMoments"
    });

    const [filter, setFilter] = useState(
        {
            location: [],
            date: [],
            join: true,
            abby: undefined
        }
    )

    const contents = {
        name: 'toggleAllMoments',
        values: ["Nu bezig", "Gepland"]
    }

    return (
        <>
            <div className='container'>
                <Title> <span className="orange__fg">Alle</span> Abby- momenten</Title>

                <ToggleButton
                    contents={contents}
                    setState={setState}
                    state={state}
                    colourClass={"toggleButton__item--orange"}
                />
            </div>

            {/* <Filter setfilter={setFilter} filter={filter} /> */}

            {
                // Show NOW
                state.toggle === 'Nu bezig'
                    ? (
                        <>
                            {/* Active moment */}
                            {
                                activeClocksOthers.length > 0 || activeClocksUser.length > 0
                                    ? (
                                        <>
                                            {/* check if their is a clock of the user active */}
                                            {activeClocksUser
                                                && <>
                                                    <h3 className='moments__subtitle h4'>Jouw moment nu bezig</h3>
                                                    <div className='container container__moments'>
                                                        <p>hier komt clockCard = lopend</p>
                                                    </div>

                                                    <h3 className='moments__subtitle h4'>Andere momenten die nu bezig zijn</h3>
                                                </>
                                            }

                                            {/* check if their are other active clocks */}
                                            {
                                                activeClocksOthers
                                                && <>
                                                    <div className='container container__moments'>
                                                        <ClockList clocks={activeClocksOthers} clockProfile={clockProfile} state={state} />
                                                    </div>
                                                    {   //show if there are clocks at the moment
                                                        activeClocksOthers
                                                        && <div className='center--flex'>
                                                            <Button extraClass={"btn__text moments_more"} >Ontdek nog meer lopende momenten</Button>
                                                        </div>
                                                    }
                                                </>
                                            }
                                        </>
                                    ) : (
                                        //show empty state if there are no active clocks
                                        <MomentsEmpty state={state} />
                                    )
                            }
                        </>
                    ) : (
                        <>
                            {
                                //show scheduled clocks
                                scheduledClocks.length > 0
                                    ? (
                                        <>
                                            <div className='container container__moments'>
                                                <ClockList clocks={scheduledClocks} clockProfile={clockProfile} state={state} />
                                            </div>

                                            <div className='center--flex'>
                                                <Button extraClass={"btn__text  moments_more"} >Ontdek nog meer geplande momenten</Button>
                                            </div>
                                        </>
                                    ) : (
                                        //show empty state if there are no scheduled clocks
                                        <MomentsEmpty state={state} />
                                    )
                            }
                        </>
                    )
            }

        </>

    )
};

export default Abbymoments;