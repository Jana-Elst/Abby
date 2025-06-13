// react
import { useState } from "react";

import "./form.css";

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
            <div className="container--form">
                <div className="progress__container">
                    <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
                    <div className="progress">
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--future"></div>
                        <div className="progress__circle progress__circle--future"></div>
                    </div>
                </div>
                <Title extraClass="form__title">Wanneer is je Abbymoment?</Title>

                {/* toggle now later */}
                {
                    formData.flow === 'plan'
                        ? <TimeInput extraClass="time" formData={formData} setFormData={setFormData} />
                        : ""
                }
                <div className="date">
                    <label className="date__now" htmlFor="planNow">
                        <input type="radio"
                            id="planNow"
                            name="time"
                            value="planNow"
                            checked={formData.flow === 'planNow'}
                            onChange={(e) => { handleChangeFlow('planNow') }}
                        />
                        Nu
                        {/* <label htmlFor="planNow">Nu</label> */}
                    </label>

                    <label className="date__later" htmlFor="plan">
                        <input type="radio"
                            id="plan"
                            name="time"
                            value="plan"
                            checked={formData.flow === 'plan'}
                            onChange={(e) => { handleChangeFlow('plan') }}

                        />
                        Later
                        {/* <label htmlFor="plan">Later</label> */}
                    </label>
                </div>
                {/* show calender  & hour picker if later */}
                <ButtonNext extraClass="next__btn btn__text purple__bg" formData={formData} setFormData={setFormData}> Volgende stap </ButtonNext>
            </div>
        </>
    );
};

export default Time;
