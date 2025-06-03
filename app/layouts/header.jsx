import {Outlet} from "react-router";
import Nav from "../components/header/nav";

const Header = () => {
    return (
        <>
            <div style={{display:"flex"}}>
                <p>Abby</p>
                <Nav />
            </div>
            <Outlet />
        </>

    )
};

export default Header;