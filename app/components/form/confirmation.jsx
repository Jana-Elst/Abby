import Button from "../molecules/button";
import Title from "../molecules/title";
import ButtonBack from './buttonBack';

const Confirmation = ({ formState, setFormState, flowForm }) => {
    return (
        <>
            <ButtonBack setFormState={setFormState} formState={formState} flowForm={flowForm}>Terug</ButtonBack>
            {
                formState === 'now'
                    ? <Title title={"Je moment is gestart!"} />
                    : <Title title={"Je moment is gepland!"} />
            }
            <p>NAAM</p>
            <p>CLOCK</p>
            <p>Tijd</p>
            <Button link={'abbymomenten'}>Ga naar jouw Abbymomenten</Button>
            <p>Pas aan</p>
        </>

    )
};

export default Confirmation;