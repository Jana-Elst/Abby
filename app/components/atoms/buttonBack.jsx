import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
    let navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)}>Terug</button> 
    )
};

export default ButtonBack;