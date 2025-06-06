import { Link } from "react-router";
import Confirmation from "../components/form/confirmation";
import Description from "../components/form/description";
import Info from "../components/form/info";
import Location from "../components/form/location";
import Participants from "../components/form/participants";
import QrCode from "../components/form/qr-code";
import Time from "../components/form/time";
import VisabilityClock from "../components/form/visability-clock";
import { useState } from "react";

const CreateClocks = () => {
    const [formState, setFormState] = useState("info");

    return (
        <>
            {
                formState === 'info'
                    ? <Info formState={formState} setFormState={setFormState} />
                    : ""
            }
            {
                formState === 'description'
                    ? <Description formState={formState} setFormState={setFormState} />
                    : ""
            }
            {
                formState === 'description'
                    ? <Description formState={formState} setFormState={setFormState} />
                    : ""
            }
            {/*
            <Location />
            <Participants />
            <QrCode />
            <Time />
            <VisabilityClock />
            <Confirmation /> */}

            <p>create a clock</p>
            <Link to={`${import.meta.env.BASE_URL}maak-activiteit`}>create a new clock</Link>
        </>

    )
};

export default CreateClocks;