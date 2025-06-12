import { useState } from 'react';

import ClockList from "../components/molecules/clockList";
import Filter from "../components/molecules/filter";
import ToggleButton from "../components/molecules/toggleButton";
import Title from "../components/molecules/title"
import InfoButton from '../components/molecules/infobutton';

//load the museum clocks
import { getAllClocks, getClockProfile } from "../services/data";
import Button from '../components/molecules/button';

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
            <Title>Alle Abbymomenten</Title>
            <InfoButton>
                <p>Hier zie je alle lopende en geplande klokjes in Abby. Zo krijg je overzicht van wat er nu gebeurt en wat eraan komt.</p>
                <p>Wie een klokje aanmaakt, kiest of anderen kunnen meedoen. Als dat mag, zie je bij dat Abbymoment een “Deelnemen” knop. Zo kun jij eenvoudig aansluiten.</p>
                <p>Gebruik deze pagina om inspiratie op te doen en samen waardevolle momenten te beleven.</p>
            </InfoButton>

            <ToggleButton
                contents={contents}
                setState={setState}
                state={state}
            />

            <Filter setfilter={setFilter} filter={filter} />

            {/*show different things depading on state*/}
            {
                state.toggle === 'Nu bezig'
                    ? <>
                        {/* Lopend moment */}
                        {/* if functie toevoegen, als moment bezig is => dan tonen */}
                        <h3>Jouw moment is nu bezig</h3>
                        <p>hier komt clockCard = lopend</p>
                        <Button>Stop dit moment</Button>

                        {/* Andere momenten die nu bezig zijn */}
                        {/* Titel ook nog in if functie steken */}
                        <h3>Andere momenten die nu bezig zijn</h3>
                        <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />

                        {/* Toon enkel als er klokken zijn */}
                        <Button>Ontdek nog meer lopende momenten</Button>
                    </>
                    : <>
                        {/* State === gepland */}
                        <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />

                        {/* Toon enkel als er klokken zijn */}
                        <Button>Ontdek nog meer geplande momenten</Button>
                    </>
            }

        </>

    )
};

export default Abbymoments;