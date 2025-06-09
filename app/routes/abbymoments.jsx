import { useState } from 'react';

import ClockList from "../components/molecules/clockList";
import Filter from "../components/molecules/filter";
import ToggleButton from "../components/molecules/toggleButton";
import Title from "../components/molecules/title"
import InfoButton from '../components/molecules/infobutton';

//load the museum clocks
import { getAllClocks, getClockProfile } from "../services/data";

export async function clientLoader() {
    const clocks = await getAllClocks();
    const clockProfile = await getClockProfile();
    return { clocks, clockProfile };
}

const Abbymoments = ({ loaderData }) => {
    const { clocks, clockProfile } = loaderData;

    //set the states
    const [state, setState] = useState("Alle Abbymomenten");
    const [filter, setFilter] = useState(
        {
            location: [],
            date: [],
            join: true
        }
    )

    return (
        <>
            <Title>{state}</Title>
            <InfoButton>
                <p>Hier zie je alle lopende en geplande klokjes in Abby. Zo krijg je overzicht van wat er nu gebeurt en wat eraan komt.</p>
                <p>Wie een klokje aanmaakt, kiest of anderen kunnen meedoen. Als dat mag, zie je bij dat Abbymoment een “Deelnemen” knop. Zo kun jij eenvoudig aansluiten.</p>
                <p>Gebruik deze pagina om inspiratie op te doen en samen waardevolle momenten te beleven.</p>
            </InfoButton>

            <ToggleButton
                content1={'Alle Abbymomenten'}
                content2={'Mijn Abbymomenten'}
                setState={setState}
                state={state}
            />

            <Filter setfilter={setFilter} filter={filter} />
            <ClockList clocks={clocks} clockProfile={clockProfile} filter={filter} state={state} />
        </>

    )
};

export default Abbymoments;