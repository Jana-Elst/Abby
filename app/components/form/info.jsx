import Title from '../molecules/title'
import Button from '../molecules/button'
import ButtonBack from '../atoms/buttonBack';

const Info = ({ formState, setFormState }) => {
    const userId = 'llll'

    return (
        <>
            <ButtonBack />
            <Title title={"Jouw dag, jouw manier bij Abby"} />
            <p>Kies jouw moment en vertel wat je doet, van workshop tot koffie, of gewoon even ontspannen. Het kan allemaal. Plan zelf, doe mee aan een Abbymoment, of geniet op jouw eigen tempo.</p>
            <p>Om een Abby moment te starten moet je ingelogd zijn.</p>

            {
                userId
                    ? <Button link={'log-in'} content={'Log in'}></Button>
                    : <button>Maak een Abbymoment</button>
            }
        </>

    )
};

export default Info;