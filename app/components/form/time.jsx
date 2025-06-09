// react
import { useState } from "react";

// components
import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";
import TimeInput from "./timeInput";

const Time = ({ setFlowForm, formData, setFormData }) => {
    const handleChangeFlow = (name) => {
        setFormData({
            ...formData,
            flow: name
        });
        setFlowForm(name);
    }

    return (
        <>
            <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
            <Title>Wanneer is je Abbymoment?</Title>

            {/* toggle now later */}
            <div>
                <div>
                    <input type="radio"
                        id="planNow"
                        name="time"
                        value="planNow"
                        checked={formData.flow === 'planNow'}
                        onChange={(e) => { handleChangeFlow('planNow') }}
                    />
                    <label htmlFor="planNow">Nu</label>
                </div>

                <div>
                    <input type="radio"
                        id="plan"
                        name="time"
                        value="plan"
                        checked={formData.flow === 'plan'}
                        onChange={(e) => { handleChangeFlow('plan') }}

                    />
                    <label htmlFor="plan">Later</label>
                </div>
            </div>

            {/* show calender  & hour picker if later */}
            {
                formData.flow === 'plan'
                    ? <TimeInput formData={formData} setFormData={setFormData} />
                    : ""
            }

            <ButtonNext formData={formData} setFormData={setFormData}> Volgende stap </ButtonNext>
        </>
    );
};

export default Time;
