import { Link } from "react-router";


const CreateClocks = () => {
   
    return (
        <>
            <p>create a clock</p>
            <Link to={`${import.meta.env.BASE_URL}maak-activiteit`}>create a new clock</Link>
        </>

    )
};

export default CreateClocks;