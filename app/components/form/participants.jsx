import Title from "../molecules/title";
import ToggleButton from "../molecules/toggleButton"
import ButtonBack from './buttonBack';
import { useState } from "react";

const Participants = ({ flowForm, setFormState, formState }) => {
    const [shareMoment, setShareMoment] = useState("Ja");

    const handleClickNext = () => {
        setFormState(formState + 1);
    }

    return (
        <>
            <ButtonBack setFormState={setFormState} formState={formState} flowForm={flowForm}>Terug</ButtonBack>
            <Title title={"Wil je je moment delen met anderen?"} />
            <ToggleButton content1={"Ja"} content2={"Nee"} state={shareMoment} setState={setShareMoment} />
            {
                flowForm === "now"
                    ? <button onClick={handleClickNext}>Start je Abbymoment</button>
                    : <button onClick={handleClickNext}>Plan je Abbymoment</button>
            }
        </>
    )
};

export default Participants;