import { useState } from 'react';

import Title from "../molecules/title";
import ToggleButton from "../molecules/toggleButton"
import InfoButton from '../../components/molecules/infobutton';

const VisabilityClock = ({ setFormState }) => {
    const [visability, setVisability] = useState("Op de klokjes muur");

    const handleClickNext = () => {
        setFormState("description");
    }

    return (
        <>
            <Title title={"Wil je je moment delen met anderen?"} />
            <InfoButton>
                <p><bold>Digitaal</bold></p>
                <p>Je kan zelf instellen wanneer je klokje start, ideaal als je thuis of onderweg bent. Je klokje verschijnt op de website, maar niet op de muur in het museum.</p>
                <p><bold>Fysiek</bold></p>
                <p>Je klokje verschijnt op de grote klokjesmuur zodat iedereen het kan zien. Je kan hier geen andere starttijd plannen.</p>
                <ul>
                    <li>Klokjes kunnen alleen lopen in Abby.</li>
                    <li>Digtaal kan je kiezen tussen nu starten (alleen aks je aanwezig bent) of later plannen (ook van thuis).</li>
                    <li>Fysiek kan je alleen nu starten, als je fysiek aanwezig bent.</li>
                </ul>
            </InfoButton>
            <ToggleButton content1={"Op de klokjes muur"} content2={"Online op de website"} state={visability} setState={setVisability} />
            {
                visability === 'Op de klokjes muur'
                    ? <p>Je klokje begint meteen te lopen en verschijnt op de klokjesmuur in Abby.</p>
                    : ""
            }

            <button onClick={handleClickNext}>Zet een klokje</button>
        </>
    )
};

export default VisabilityClock;