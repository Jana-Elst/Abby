import { Link, Outlet } from "react-router";
import Nav from "../components/header/nav";
import Button from "../components/molecules/button";

const Header = () => {
    return (
        <>
            <div style={{ display: "flex" }}>
                <Link to={`${import.meta.env.BASE_URL}`}>
                    Abby
                </Link>
                <Nav />
            </div>
            <Outlet />
        </>

    )
};

export default Header