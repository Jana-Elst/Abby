import { NavLink } from "react-router";

const Home = () => {
    return (
        <>
            <p>campaign</p>
            <NavLink to={`${import.meta.env.BASE_URL}account`}>account</NavLink>
        </>

    )
};

export default Home;