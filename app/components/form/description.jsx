import { useState } from "react";
import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";
import "./form.css";


const Description = ({ formData, setFormData }) => {
    const [correctInput, setCorrectInput] = useState(formData.name ? true : false);
    const [touched, setTouched] = useState(false);

    const handleValidation = (e) => {
        if (e.target.value < 1) {
            setCorrectInput(false);
        } else {
            setCorrectInput(true);
        }
    }

    return (
        <div className="container__stretch">
            <div className="container--form">
                <div className="progress__container">
                    {/* different actions for return buttons in different flows */}
                    {
                        formData.flow === 'now' && 'planNow'
                            // flow now & planNow
                            ? <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
                            // flow now
                            : <ButtonBack formData={formData} setFormData={setFormData} link={"maak-een-abbymoment"}>Terug</ButtonBack>
                    }

                    {/*  */}
                    <div className="progress">
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--future"></div>
                        <div className="progress__circle progress__circle--future"></div>
                        <div className="progress__circle progress__circle--future"></div>
                    </div>

                </div>
                <Title extraClass="form__title">Maak je Abbymoment</Title>
                <div className="form__questions">
                    <div className="form__question h4">
                        <label htmlFor="name">Titel <span>*</span></label>
                        <p className={`${(!correctInput && touched) && 'display'} error`}>Vul een titel in</p>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            maxLength="40"
                            placeholder='Titel'
                            value={formData.name}
                            onChange={(e) => {
                                handleValidation(e);
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                });
                            }}
                            onBlur={() => setTouched(true)}
                            onFocus={() => setTouched(false)}
                            required />
                    </div>
                    <div className="form__question h4">
                        <label htmlFor="description">Beschrijving</label>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            maxLength="300"
                            placeholder='max. 300 karakters'
                            rows={10}
                            cols={5}
                            value={formData.description}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>

            </div>
            <ButtonNext
                extraClass={`next__btn btn__text purple__bg ${!correctInput && 'disabled'}`}
                formData={formData}
                setFormData={setFormData}
                disabled={!correctInput}>Volgende stap</ButtonNext>
        </div>
    )
};

export default Description;