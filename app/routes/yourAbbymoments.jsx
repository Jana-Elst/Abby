//imports reaact
import { useState } from 'react';

//Components
import ClockList from "../components/molecules/clockList";
import ToggleButton from "../components/molecules/toggleButton";
import Title from "../components/molecules/title"
import InfoButton from '../components/molecules/infobutton';
import Button from '../components/molecules/button';

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
        toggle: "Gepland",
        page: "yourMoments"
    });

    const contents = {
        name: 'toggleYourMoments',
        values: ["Nu", "Gepland", "Afgelopen"]
    }

    return (
        <>
            <Title>Jouw Abbymomenten</Title>
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

            {/*show different things depading on state*/}
            {
                state.toggle === 'Nu'
                    ? <>
                        {/* Lopend moment */}
                        {/* if functie toevoegen, als moment bezig is => dan tonen */}
                        <h3>Jouw moment is nu bezig</h3>
                        <p>hier komt clockCard = lopend</p>
                        <Button>Stop dit moment</Button>

                        {/* If functie als je deelneemt aan een lopend moment */}
                        <h3>Je neemt deel aan een lopend moment</h3>
                        <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />

                    </>
                    : state.toggle === 'Gepland'
                        ? <>
                            {/* State === gepland */}
                            {/* Als je eigen geplande momenten hebt */}
                            <h3>Jouw geplande momenten</h3>
                            <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />

                            {/* Als je deelneemt aan geplande moment */}
                            <h3>Geplande momenten waar je aan deelneemt</h3>
                            <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />

                        </>
                        : <>
                            {/* State === afgelopen */}
                            {/* Als je eigen afgelopen momenten hebt */}
                            <h3>Jouw afgelopen momenten</h3>
                            <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />

                            {/* Als je deelnam aan afgelopen evenementen */}
                            <h3>Afgelopen momenten waar je bij was</h3>
                            <ClockList clocks={clocks} state={state} clockProfile={clockProfile} />
                        </>
            }

        </>

    )
};

export default YourAbbyMoments;