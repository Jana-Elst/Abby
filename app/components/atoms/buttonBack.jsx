import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
    let navigate = useNavigate();

    return (
        <button type='button' onClick={() => navigate(-1)}>Terug</button> 
    )
};

export default ButtonBack;