import './popUp.css'

import Button from "./button";

const PopUp = ({ children, setUiState, uiState }) => {
    const handleClickClose = () => {
        setUiState({
            ...uiState,
            popUpOpen: false
        })
    }

    return (
        <div>
            <Button onClick={handleClickClose}>CLOSE X</Button>
            {children}
        </div>
    )
};

export default PopUp;