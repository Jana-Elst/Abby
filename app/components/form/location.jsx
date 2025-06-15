import Title from "../molecules/title";
import { locations } from "../../services/museumData";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";


const Location = ({ formData, setFormData }) => {
    const locationsRadio = [...locations, 'Ik weet het nog niet'];

    return (
        <>
            <div className="container--form">
                <div className="progress__container">
                    <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
                    <div className="progress">
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--future"></div>
                    </div>
                </div>
                <Title extraClass="form__title">Wat is de locatie van jouw moment?</Title>
                <div className="location">
                    {
                        locationsRadio.map(location =>
                            <label key={location} className="location__btn" htmlFor={location}>
                                <input type="radio"
                                    id={location}
                                    name="location"
                                    value={location}
                                    checked={location === formData.location}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            location: e.target.value
                                        })
                                    }}
                                />
                                {location}
                                {/* <label htmlFor={location}>{location}</label> */}
                            </label>
                        )
                    }
                </div>
            <ButtonNext extraClass="next__btn btn__text purple__bg" formData={formData} setFormData={setFormData}> Volgende stap </ButtonNext>
            </div>
        </>

    )
};

export default Location;