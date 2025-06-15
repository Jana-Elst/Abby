import { Link } from "react-router";
import './button.css'


//TYPES OF BUTTONS NEEDED
/*
- primary & secondary
- icon vs no-icon (double, front, back)
- external vs internal link
*/

const Button = ({ link, children, icon = '', onClick = null, type = 'button', extraClass = ''}) => {

    if (link) {
        return (
            <Link className={`${extraClass} button ${icon} `} to={`${import.meta.env.BASE_URL}${link}`}>
                {children}
            </Link>
        )
    } else {
        return (
            <button type={type} className={`${extraClass} button ${icon}`} onClick={onClick}>{children}</button>
        )
    }
};

export default Button;