
import { useNavigate } from "react-router";
import './buttonBack.css';
import arrow from "../../src/assets/arrow-right.svg";

const ButtonBack = ({navigateSteps = null}) => {
    let navigate = useNavigate();
    let navSteps = navigateSteps ? navigateSteps : (-1)

    return (
        <button className="btn__back" type='button' onClick={() => navigate(navSteps)}><img className='btn__icon btn__icon--back' src={arrow} alt="een pijl" />Terug</button>

    )
};

export default ButtonBack;