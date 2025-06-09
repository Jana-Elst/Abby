//react
import { useContext } from "react";

//global variables
import { UserContext } from '../../root';

//components
import Title from '../molecules/title'
import Button from '../molecules/button'
import ButtonNext from "./buttonNext";

const Info = ({ formData, setFormData }) => {
    const { userId } = useContext(UserContext);

    const handleClickNext = () => {
        setFormData({
            ...formData,
            state: formData.state + 1
        });
    }

    return (
        <>
            <Title>Jouw dag, jouw manier bij Abby</Title>
            <p>Kies jouw moment en vertel wat je doet, van workshop tot koffie, of gewoon even ontspannen. Het kan allemaal. Plan zelf, doe mee aan een Abbymoment, of geniet op jouw eigen tempo.</p>
            <p>Om een Abby moment te starten moet je ingelogd zijn.</p>

            {
                userId
                    ? <ButtonNext setFormData={setFormData} formData={formData}>Maak een Abbymoment</ButtonNext>
                    : <Button link={'log-in'} onClick={handleClickNext}>Log-in</Button>
            }
        </>

    )
};

export default Info;