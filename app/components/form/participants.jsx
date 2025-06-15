import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";

import { useState } from "react";

const Participants = ({ formData, setFormData }) => {
    const [touched, setTouched] = useState(false);

    return (
        <>
            <div className="container--form">
                <div className="progress__container">
                    <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
                    <div className="progress">
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                    </div>
                </div>
                <Title extraClass="form__title">Wil je je moment delen met anderen?</Title>
                <div className="share">
                    <label htmlFor="true" className="share__btn">
                        <input type="radio"
                            id="true"
                            name="participants"
                            value="true"
                            checked={formData.private === true}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    private: e.target.value === "false" ? false : true
                                })
                            }}
                            onFocus={() => {
                                setTouched(true);
                            }}
                            required
                        />
                        Nee, Ik heb liever een Abbymoment alleen.
                        {/* <label htmlFor="true">Nee, Ik heb liever een Abbymoment alleen.</label> */}
                    </label>
                    <label htmlFor="false" className="share__btn">
                        <input type="radio"
                            id="false"
                            name="participants"
                            value="false"
                            checked={formData.private === false}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    private: e.target.value === "true" ? true : false
                                })
                            }}
                            onFocus={() => {
                                setTouched(true);
                            }}
                            required
                        />
                        ja, hoe meer zielen hoe meer vreugd.
                        {/* <label htmlFor="false">Ja, hoe meer zielen hoe meer vreugd.</label> */}
                    </label>
                </div>
            </div>

            {
                formData.flow === "now" || formData.flow === 'planNow'
                    ? <ButtonNext extraClass="next__btn btn__text purple__bg"
                        buttonType='submit'
                        formData={formData}
                        setFormData={setFormData}
                        disabled={!formData.private}
                    > Start je moment </ButtonNext>
                    : <ButtonNext extraClass="next__btn btn__text purple__bg"
                        buttonType='submit'
                        formData={formData}
                        setFormData={setFormData}
                        disabled={!touched}
                    > Maak moment aan </ButtonNext>
            }
        </>
    )
};

export default Participants