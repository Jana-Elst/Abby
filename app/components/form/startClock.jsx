import "./form.css";

// components
import ButtonNext from "./buttonNext";

const StartClock = ({ formData, setFormData }) => {

    return (
        <div className="btn__big__container">
        <div className="btn__big purple__bg">
            <ButtonNext buttonType="submit" extraClass="h2 purple__bg btn__big__text" formData={formData} setFormData={setFormData}> Start <br /> Abbymoment</ButtonNext>
        </div>
        </div>
    )
};

export default StartClock;