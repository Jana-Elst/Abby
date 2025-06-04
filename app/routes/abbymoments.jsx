import { useState } from 'react';

import ClockList from "../components/molecules/clockList";
import Filter from "../components/molecules/filter";
import ToggleButton from "../components/molecules/toggleButton";
import Title from "../components/molecules/title"
import InfoButton from '../components/molecules/infobutton';

//load the museum clocks
import { getMuseumClocks } from "../services/data";
import infoButton from '../components/molecules/infobutton';
export async function clientLoader() {
    const museumClocks = await getMuseumClocks();
    console.log(museumClocks);

    return { museumClocks };
}

const Abbymoments = ({ loaderData }) => {
    const { museumClocks } = loaderData;

    //set the states
    const [state, setState] = useState("Alle Abbymomenten");
    const [filter, setFilter] = useState(
        {
            location: [],
            date: [],
            join: true,
        }
    )
    console.log(state);

    return (
        <>
            <Title title={state} />
            <InfoButton>
                <p>Hier zie je alle lopende en geplande klokjes in Abby. Zo krijg je overzicht van wat er nu gebeurt en wat eraan komt.</p>
                <p>Wie een klokje aanmaakt, kiest of anderen kunnen meedoen. Als dat mag, zie je bij dat Abbymoment een “Deelnemen” knop. Zo kun jij eenvoudig aansluiten.</p>
                <p>Gebruik deze pagina om inspiratie op te doen en samen waardevolle momenten te beleven.</p>
            </InfoButton>

            <ToggleButton
                content1={'Alle Abbymomenten'}
                content2={'Jouw Abbymomenten'}
                setState={setState}
                state={state}
            />

            <Filter setfilter={setFilter} filter={filter} />
            <ClockList clocks={museumClocks} />
        </>

    )
};

export default Abbymoments;