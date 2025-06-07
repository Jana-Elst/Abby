import Title from "../molecules/title";
import { locations } from "../../services/museumData";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";


const Location = ({ setFormState, formState, flowForm, flowKey, formData, setFormData }) => {
    const locationsRadio = [...locations, 'Ik weet het nog niet'];

    return (
        <>
            <ButtonBack setFormState={setFormState} formState={formState} flowForm={flowForm}>Terug</ButtonBack>
            <Title>Wat is de locatie van jouw moment?</Title>
            {
                locationsRadio.map(location =>
                    <div>
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
            <ButtonNext
                setFormState={setFormState}
                formState={formState}
                flowForm={flowForm}
                flowKey={flowKey}
                formData={formData}
            > Volgende stap </ButtonNext>
        </>

    )
};

export default Location;