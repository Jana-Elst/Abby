import Button from "../molecules/button";
import Title from "../molecules/title";
import arrow from "../../src/assets/arrow-right.svg";

import { useLocation } from "react-router";
import { useContext } from "react";


//root variables
import { UserContext } from '../../context/UserContext';
import { Navigate } from "react-router";

const Confirmation = ({ formState, setFormState, setFlowForm }) => {
    const { userId } = useContext(UserContext);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const clockId = params.get("clockId");

    const removeStates = () => {
        setFormState({
            clockId: '',
            name: '',
            startTime: undefined,
            stopTime: undefined,
            clockWallPos: '',
            description: '',
            private: '',
            scheduledStartTime: '',
            scheduledStopTime: undefined,
            creator: userId,
            location: '',
            state: 0,
            flow: ''
        })

        setFlowForm('plan');
    }
    console.log(formState);
{
        return (
            <div className="confirm">
                {
                    formState === 'now'
                        ? <Title title={"Je moment is gestart!"} />
                        : <Title title={"Je moment is gepland!"} />
                }
                <p className="confirm__title">Je moment is succesvol aangemaakt</p>
                <Button onClick={removeStates} extraClass="btn__text confirm__btn purple__bg btn__arrow" link={`abbymomenten/${clockId}`}>Ga naar je moment<img className='btn__icon' src={arrow} alt="een pijl" /></Button>
            </div>

        )
    }
};

export default Confirmation;