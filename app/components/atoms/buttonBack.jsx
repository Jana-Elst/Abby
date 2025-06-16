
import { useNavigate } from "react-router";
import './buttonBack.css';
import arrow from "../../src/assets/arrow-right.svg";

const ButtonBack = ({ navigateSteps = null }) => {
    console.log(navigateSteps);
    let navSteps
    let navigate = useNavigate();

    if (navigateSteps) {
        if (navigateSteps.navPath) {
            navSteps = `${import.meta.env.BASE_URL}${navigateSteps.navPath}`
        } else {
            navSteps = navigateSteps.navPath
        }
    } else {
        navSteps = -1
    }
   
    console.log(navSteps);

    return (
        <button className="btn__back" type='button' onClick={() => navigate(navSteps)}><img className='btn__icon btn__icon--back' src={arrow} alt="een pijl" />Terug</button>

    )
};

export default ButtonBack;