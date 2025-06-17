import './popUp.css'

import iconWarning from "../../src/assets/icon-warning.svg"
import iconClose from "../../src/assets/icon-close.svg"

import Button from "./button";

const PopUp = ({ children, setUiState, uiState, extraClass }) => {
    const handleClickClose = () => {
        setUiState({
            ...uiState,
            popUpOpen: false,
            confirmation: false
        })
    }

    return (
        <>
            <div className={`${(uiState.popUpOpen || uiState.confirmation) ? 'popup__overlay' : ''}`}></div>
            <div className={`${(uiState.popUpOpen || uiState.confirmation) ? 'open' : 'close'} ${extraClass}`}>
                <div className='popup__header'>
                    {
                        uiState.popUpOpen && <img className="popup__warning" src={iconWarning} alt="melding icon" /> 
                    }
                    <Button onClick={handleClickClose} extraClass="popup__btn"><img src={iconClose} alt="close icon" /></Button>
                </div>
                {children}
            </div>
        </>
    )
};

export default PopUp;