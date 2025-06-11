import { Link } from "react-router";
import './button.css'


//TYPES OF BUTTONS NEEDED
/*
- primary & secondary
- icon vs no-icon (double, front, back)
- external vs internal link
*/

const Button = ({ link, children, icon = null, click = null, type = 'button', extraClass }) => {

    if (link) {
        return (
            <Link className={`button ${icon ? icon : ""} ${extraClass? extraClass : ""}`} to={`${import.meta.env.BASE_URL}${link}`}>
                {children}
            </Link>
        )
    } else {
        return (
            <button type={type} className={`button ${icon ? icon : ""}`} onClick={click}>{children}</button>
        )
    }
};

export default Button;