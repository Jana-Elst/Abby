import Button from "../molecules/button";
import Title from "../molecules/title";
import arrow from "../../src/assets/arrow-right.svg";

import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";


//root variables
import { UserContext } from '../../context/UserContext';

const Confirmation = ({ formData, setFormData, setFlowForm }) => {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();

    const navPath = [
        { flow: 'plan', navPath: 'maak-een-abbymoment' },
        { flow: 'planNow', navPath: 'maak-een-abbymoment' },
        { flow: 'restartMoment', navPath: 'jouw-abbymomenten' },
        { flow: 'restartMomentNow', navPath: 'jouw-abbymomenten' },
        { flow: 'now', navPath: 'maak-een-abbymoment' },
        { flow: 'startScheduled', navPath: -2 }
    ]


    // const location = useLocation();
    // const params = new URLSearchParams(location.search);
    const clockId = sessionStorage.getItem("clockId");
    console.log(clockId);
    console.log(formData.flow);
    const nav = navPath.find(item => item.flow === formData.flow);
    console.log(nav);

    const removeStates = () => {
        setFormData({
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
        navigate(`${import.meta.env.BASE_URL}abbymomenten/${clockId}`, {
            state: { nav: nav.navPath }
        });
    }

    return (
        <div className="confirm">
            {
                formData.flow === 'now' || formData.flow === 'planNow' || formData.flow === 'restartNow'
                    ? <p className="confirm__title"> Je moment is gestart!</p>
                    : <p className="confirm__title"> Je moment is gepland!</p>
            }
            <Button type='button' onClick={removeStates} extraClass="btn__text confirm__btn purple__bg btn__arrow">Ga naar je moment<img className='btn__icon' src={arrow} alt="een pijl" /></Button>
        </div >

    )
};

export default Confirmation;
