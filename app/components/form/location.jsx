import Title from "../molecules/title";
import { locations } from "../../services/museumData";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";


const Location = ({ formData, setFormData }) => {
    const locationsRadio = [...locations, 'Ik weet het nog niet'];

    return (
        <>
            <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
            <Title>Wat is de locatie van jouw moment?</Title>
            {
                locationsRadio.map(location =>
                    <div key={location}>
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
                        <label htmlFor={location}>{location}</label>
                    </div>
                )
            }
            <ButtonNext formData={formData} setFormData={setFormData}> Volgende stap </ButtonNext>
        </>

    )
};

export default Location;