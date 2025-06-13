import Button from "../molecules/button";
import Title from "../molecules/title";
import arrow from "../../src/assets/arrow-right.svg";

const Confirmation = ({ formState, setFormState, flowForm }) => {
    return (
        <div className="confirm">
            {
                formState === 'now'
                    ? <Title title={"Je moment is gestart!"} />
                    : <Title title={"Je moment is gepland!"} />
            }
            <p className="confirm__title">Je moment is succesvol aangemaakt</p>
            <Button extraClass="btn__text confirm__btn purple__bg btn__arrow" link={'abbymomenten'}>Ga naar je moment<img className='btn__icon' src={arrow} alt="een pijl" /></Button>
        </div>

    )
};

export default Confirmation;