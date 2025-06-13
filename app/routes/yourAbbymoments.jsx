//imports reaact
import { useState } from 'react';

//Components
import ClockList from "../components/molecules/clockList";
import ToggleButton from "../components/molecules/toggleButton";
import Title from "../components/molecules/title"
import InfoButton from '../components/molecules/infobutton';
import Button from '../components/molecules/button';
import './abbymoments.css'

import arrow from "../src/assets/arrow-right.svg";

//Functions
import { getAllClocks, getClockProfile } from "../services/data";

export async function clientLoader() {
    const clocks = await getAllClocks();
    const clockProfile = await getClockProfile();
    return { clocks, clockProfile };
}

const YourAbbyMoments = ({ loaderData }) => {
    const { clocks, clockProfile } = loaderData;

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
                            {/* Lopend moment */}
                            {/* if functie toevoegen, als moment bezig is => dan tonen */}
                            <h3 className='moments__subtitle h4'>Jouw moment is nu bezig</h3>
                            <div className='container container__moments'>
                                <p>hier komt clockCard = lopend</p>
                            </div>

                            {/* If functie als je deelneemt aan een lopend moment */}
                            <h3 className='moments__subtitle h4'>Je neemt deel aan een lopend moment</h3>
                            <div className='container container__moments'>
                                <p>hier komt clockCard = lopend als deelnemer</p>
                            </div>

                        </>
                        : state.toggle === 'Gepland'
                            ? <>
                                {/* State === gepland */}
                                {/* Als je eigen geplande momenten hebt */}
                                <h3 className='moments__subtitle h4'>Jouw geplande momenten</h3>
                                <div className='container container__moments'>
                                    <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />
                                </div>
                                {/* Als je deelneemt aan geplande moment */}
                                <h3 className='moments__subtitle h4'>Momenten waar je aan deelneemt</h3>
                                <div className='container container__moments'>
                                    <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />
                                </div>
                                
                                <div className='container'>
                                    <Button extraClass="btn__text moment__btn yellow__bg btn__arrow" link={"maak-een-abbymoment"} >Creëer een niew moment <img className='btn__icon' src={arrow} alt="een pijl" /></Button>
                                </div>
                            </>
                            : <>
                                {/* State === afgelopen */}
                                {/* Als je eigen afgelopen momenten hebt */}
                                <h3 className='moments__subtitle h4'>Jouw afgelopen momenten</h3>
                                <div className='container container__moments'>
                                    <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />
                                </div>

                                {/* Als je deelnam aan afgelopen evenementen */}
                                <h3 className='moments__subtitle h4'>Afgelopen momenten waar je bij was</h3>
                                <div className='container container__moments'>
                                    <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />
                                </div>

                                <div className='container'>
                                    <Button extraClass="btn__text moment__btn yellow__bg btn__arrow" link={"maak-een-abbymoment"} >Creëer een niew moment <img className='btn__icon' src={arrow} alt="een pijl"/></Button>
                                </div>
                            </>
                }
            </div>
        </>

    )
};

export default YourAbbyMoments;