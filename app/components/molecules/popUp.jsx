import './popUp.css'

import Button from "./button";

const PopUp = ({ children, setUiState, uiState }) => {
    const handleClickClose = () => {
        setUiState({
            ...uiState,
            popUpOpen: false,
            confirmation: false
        })
    }

    return (
        <div className={uiState.popUpOpen ? 'open' : 'close'}>
            <Button onClick={handleClickClose}>CLOSE X</Button>
            {children}
        </div>
    )
};

export default PopUp;