//react
import { useContext } from "react";

//global variables
import { UserContext } from '../../root';

//components
import Title from '../molecules/title'
import Button from '../molecules/button'
import ButtonBack from '../atoms/buttonBack';

const Info = ({ formState, setFormState, flowForm }) => {
    const { userId } = useContext(UserContext);

    const handleClickNext = () => {
        setFormState(formState + 1);
    }

    return (
        <>
            <ButtonBack />
            <Title title={"Jouw dag, jouw manier bij Abby"} />
            <p>Kies jouw moment en vertel wat je doet, van workshop tot koffie, of gewoon even ontspannen. Het kan allemaal. Plan zelf, doe mee aan een Abbymoment, of geniet op jouw eigen tempo.</p>
            <p>Om een Abby moment te starten moet je ingelogd zijn.</p>

            {
                userId
                    ? <button onClick={handleClickNext}>Maak een Abbymoment</button>
                    : <Button link={'log-in'} onClick={handleClickNext}>Log-in</Button>
            }
        </>

    )
};

export default Info;