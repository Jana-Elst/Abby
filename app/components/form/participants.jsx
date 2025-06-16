import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";

import { useState } from "react";

const Participants = ({ formData, setFormData }) => {
    const [touched, setTouched] = useState(formData.particpant);

    return (
        <div className="container__stretch">
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
            </div>
            <div>
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
                        />
                        ja, hoe meer zielen hoe meer vreugd.
                        {/* <label htmlFor="false">Ja, hoe meer zielen hoe meer vreugd.</label> */}
                    </label>
                </div>


                {
                    formData.flow === "now" || formData.flow === 'planNow'
                        ? <ButtonNext extraClass="next__btn btn__text purple__bg"
                            buttonType='button'
                            formData={formData}
                            setFormData={setFormData}
                            disabled={!touched}
                        > Start je moment </ButtonNext>
                        : <ButtonNext extraClass="next__btn btn__text purple__bg"
                            buttonType='button'
                            formData={formData}
                            setFormData={setFormData}
                            disabled={!touched}
                        > Maak moment aan </ButtonNext>
                }
            </div>
        </div >
    )
};

export default Participants