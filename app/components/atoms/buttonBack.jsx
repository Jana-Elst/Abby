
import { useNavigate } from "react-router";
import './buttonBack.css';
import arrow from "../../src/assets/arrow-right.svg";

const ButtonBack = () => {
    let navigate = useNavigate();

    return (
        <button className="btn__back" type='button' onClick={() => navigate(-1)}><img className='btn__icon btn__icon--back' src={arrow} alt="een pijl" />Terug</button>

    )
};

export default ButtonBack;