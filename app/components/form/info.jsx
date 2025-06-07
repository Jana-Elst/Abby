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
        if (flowForm === 'now') {
            setFormState('visabilityClock');
        } else {
            setFormState('description');
        }
    }

    return (
        <>
            <ButtonBack />
            <Title title={"Jouw dag, jouw manier bij Abby"} />
            <p>Kies jouw moment en vertel wat je doet, van workshop tot koffie, of gewoon even ontspannen. Het kan allemaal. Plan zelf, doe mee aan een Abbymoment, of geniet op jouw eigen tempo.</p>
            <p>Om een Abby moment te starten moet je ingelogd zijn.</p>

            {
                userId
                    ? <Button link={'log-in'} onClick={handleClickNext}>Log-in</Button>
                    : <button onClick={handleClickNext}>Maak een Abbymoment</button>
            }
        </>

    )
};

export default Info;