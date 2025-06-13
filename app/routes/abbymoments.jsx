import { useState } from 'react';

import ClockList from "../components/molecules/clockList";
import Filter from "../components/molecules/filter";
import ToggleButton from "../components/molecules/toggleButton";
import Title from "../components/molecules/title"
import InfoButton from '../components/molecules/infobutton';

//load the museum clocks
import { getAllClocks, getClockProfile } from "../services/data";
import Button from '../components/molecules/button';

import './abbymoments.css'

export async function clientLoader() {
    const clocks = await getAllClocks();
    const clockProfile = await getClockProfile();
    return { clocks, clockProfile };
}

const Abbymoments = ({ loaderData }) => {
    const { clocks, clockProfile } = loaderData;

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

            <Filter setfilter={setFilter} filter={filter} />

            {/*show different things depading on state*/}

            {
                state.toggle === 'Nu bezig'
                    ? <>
                        {/* Lopend moment */}
                        {/* if functie toevoegen, als moment bezig is => dan tonen */}
                        <h3 className='moments__subtitle h4'>Jouw moment nu bezig</h3>
                        <div className='container container__moments'>
                            <p>hier komt clockCard = lopend</p>
                        </div>


                        {/* Andere momenten die nu bezig zijn */}
                        {/* Titel ook nog in if functie steken */}
                        <h3 className='moments__subtitle h4'>Andere momenten die nu bezig zijn</h3>
                        <div className='container container__moments'>
                            <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />
                        </div>
                        {/* Toon enkel als er klokken zijn */}
                        <div className='center--flex'>
                            <Button extraClass={"btn__text moments_more"} >Ontdek nog meer lopende momenten</Button>
                        </div>
                    </>
                    : <>
                        {/* State === gepland */}
                        <div className='container container__moments'>
                            <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />
                        </div>

                        {/* Toon enkel als er klokken zijn */}
                        <div className='center--flex'>
                            <Button extraClass={"btn__text  moments_more"} >Ontdek nog meer geplande momenten</Button>
                        </div>
                    </>
            }

        </>

    )
};

export default Abbymoments;