import { Link, useNavigate } from "react-router";
import "./buttonBack.css";
import arrow from "../../src/assets/arrow-right.svg";

const ButtonBack = ({ children, setFormData, formData, link = null }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (formData.state === 0) {
            navigate(-1);
        }

        setFormData(
            {
                ...formData,
                state: formData.state - 1
            }
        );

        if (formData.flow === 'planNow' && formData.state === 3) {
            setFormData(
                {
                    ...formData,
                    state: formData.state - 2
                }
            );
        }
    }

    if (!link) {
        //button
        return (
            <button className="btn__back" type='button' onClick={handleBack}>
                <img className='btn__icon btn__icon--back' src={arrow} alt="een pijl" />
                {children}
            </button>
        )
    } else {
        //navlink
        return (
            <Link className="btn__back" to={`${import.meta.env.BASE_URL}${link}`}>
                <img className='btn__icon btn__icon--back' src={arrow} alt="een pijl" />
                {children}
            </Link>
        )
    }
};

export default ButtonBack;