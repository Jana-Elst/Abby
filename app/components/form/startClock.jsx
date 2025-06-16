import "./form.css";

import ButtonBack from "./buttonBack";

// components
import ButtonNext from "./buttonNext";

const StartClock = ({ formData, setFormData }) => {
    return (
        <>
            <div className="container--form">
                <div className="progress__container">
                    <ButtonBack
                        formData={formData}
                        setFormData={setFormData}
                    >Terug</ButtonBack>
                </div>
                <ButtonNext buttonType="submit" extraClass="next__btn btn__text purple__bg" formData={formData} setFormData={setFormData}>Start Abbymoment</ButtonNext>
            </div>
        </>)
};

export default StartClock;