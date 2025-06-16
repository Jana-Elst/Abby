import { useState } from "react";

import "./form.css";

// components
import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";
import TimeInput from "./timeInput";
import { getDate, getISOLocalString, isMonday, nextDay } from "../../services/clock";

const Time = ({ setFlowForm, flows, formData, setFormData }) => {
    //------------ VALLIDATION ------------//
    const [correctInput, setCorrectInput] = useState(false);
    const [touched, setTouched] = useState(false);

    const handleValidation = (e) => {
        console.log(e.target.value);
        if (e.target.value < 1) {
            setCorrectInput(false);
        } else {
            setCorrectInput(true);
        }
    }

    //------------ specific for page ------------//
    const baseFlow = formData.state === 0 ? 'restartMoment' : 'plan';

    const handleChangeFlow = (e) => {
        console.log(e.target.value);
        let time = getDate(getISOLocalString());

        if (isMonday(time.day)) {
            time = getDate(nextDay(1));
            console.log('nextday', time);
        }

        if (e.target.value !== 'now') {
            time.time = `${time.hour}:00:00`
        }

        setFormData({
            ...formData,
            flow: `${baseFlow}${e.target.value === 'now' ? 'Now' : ""}`,
            scheduledStartTime: `${time.day}T${time.time}`
        });

        setFlowForm(`${baseFlow}${e.target.value === 'now' ? 'Now' : ""}`);
    }

    const timeOptions = [
        { value: 'now', label: 'Nu' },
        { value: 'later', label: 'Later' }
    ]

    return (
        <div className="container__stretch">
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
                    (touched && formData.flow === baseFlow)
                    && <TimeInput
                        extraClass="time"
                        formData={formData}
                        setFormData={setFormData}
                    />
                }
            </div>
            <div>
                <div className="date">
                    {timeOptions.map((option) => (
                        <label
                            key={option.value}
                            className={`date__${option.value}`}
                            htmlFor={option.value}
                        >
                            <input
                                type="radio"
                                id={option.value}
                                name="time"
                                value={option.value}
                                checked={touched && formData.flow === `${baseFlow}${option.value === 'now' ? 'Now' : ''}`}
                                onChange={(e) => {
                                    handleValidation(e);
                                    handleChangeFlow(e);
                                }}
                                onFocus={(e) => {
                                    setTouched(true);
                                    handleChangeFlow(e);
                                }}
                                required
                                disabled={
                                    (option.value === 'now' && formData.userHasActiveClock) ? true : false
                                }
                            />
                            {option.label}
                            {<span className="showIfChecked">
                                {formData.scheduledStartTime && <>{getDate(formData.scheduledStartTime).day} {getDate(formData.scheduledStartTime).monthName} {getDate(formData.scheduledStartTime).hour}:{getDate(formData.scheduledStartTime).minutes}</>}
                            </span>

                            }
                        </label>
                    ))}
                </div>
                {/* check if form should be submit */}
                {
                    flows[formData.flow].length > 2 ?
                        <ButtonNext
                            extraClass="next__btn btn__text purple__bg"
                            formData={formData}
                            setFormData={setFormData}
                            disabled={!formData.scheduledStartTime}> Volgende stap </ButtonNext>
                        : <ButtonNext
                            buttonType="submit"
                            extraClass="next__btn btn__text purple__bg"
                            formData={formData}
                            setFormData={setFormData}
                            disabled={!formData.scheduledStartTime}> Maak moment aan</ButtonNext>
                }
            </div>
        </div>
    );
};

export default Time;
