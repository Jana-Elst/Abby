import { Link } from "react-router";


const CreateClocks = () => {
   
    return (
        <>
            <p>create a clock</p>
            <Link to={"/maak-activiteit"}>create a new clock</Link>
        </>

    )
};

export default CreateClocks;