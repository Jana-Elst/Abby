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
            </div>
        <div className="btn__big__container">
        <div className="btn__big purple__bg">
            <ButtonNext buttonType="submit" extraClass="h2 purple__bg btn__big__text" formData={formData} setFormData={setFormData}> Start <br /> Abbymoment</ButtonNext>
        </div>
        </div>
    </>)
};

export default StartClock;