import Title from "../molecules/title";
import ToggleButton from "../molecules/toggleButton"
import { useState } from "react";

const Participants = ({ flowForm, setFormState }) => {
    const [shareMoment, setShareMoment] = useState("Ja");

    const handleClickNext = () => {
        setFormState("confirmation");
    }

    return (
        <>
            <Title title={"Wil je je moment delen met anderen?"} />
            <ToggleButton content1={"Ja"} content2={"Nee"} state={shareMoment} setState={setShareMoment} />
            {/* depends on flowState!!!  */}

            {
                flowForm === "now"
                    ? <button onClick={handleClickNext}>Start je Abbymoment</button>
                    : <button onClick={handleClickNext}>Plan je Abbymoment</button>
            }
        </>
    )
};

export default Participants;