import "./form.css";

// components
import ButtonNext from "./buttonNext";

const StartClock = ({ formData, setFormData }) => {
    return <ButtonNext buttonType="submit" extraClass="next__btn btn__text purple__bg" formData={formData} setFormData={setFormData}> Maak moment aan</ButtonNext>
};

export default StartClock;