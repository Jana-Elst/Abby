import { Outlet } from "react-router";

const Footer = () => {
    return (
        <>
            <>
                <Outlet />
                <p>FOOTER</p>
            </>
        </>
    )
};

export default Footer;