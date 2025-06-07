import Title from "../molecules/title";
import { locations } from "../../services/museumData";
import ButtonBack from './buttonBack';

const Location = ({ setFormState, formState, flowForm }) => {
    const handleClickNext = () => {
        setFormState(formState + 1);
    }

    return (
        <>
            <ButtonBack setFormState={setFormState} formState={formState} flowForm={flowForm}>Terug</ButtonBack>
            <Title>Wat is de locatie van jouw moment?</Title>
            {
                locations().map(location =>
                    <div>
                        <input type="radio" id={location} name="location" value={location} />
                        <label htmlForor={location}>{location}</label>
                    </div>
                )
            }
            <div>
                <input type="radio" id="Ik weet het nog niet" name="location" value="Ik weet het nog niet" />
                <label htmlForor="Ik weet het nog niet">Ik weet het nog niet</label>
            </div>
            <button onClick={handleClickNext}>Volgende stap</button>
        </>

    )
};

export default Location;