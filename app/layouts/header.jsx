import { Link, Outlet } from "react-router";
import Nav from "../components/header/nav";
import Button from "../components/molecules/button";

const Header = () => {
    return (
        <>
            <div style={{ display: "flex" }}>
                <Button link={''}>Abby</Button>
                <Nav />
            </div>
            <Outlet />
        </>

    )
};

export default Header