import { Link } from "react-router";
import './button.css'


//TYPES OF BUTTONS NEEDED
/*
- primary & secondary
- icon vs no-icon (double, front, back)
- external vs internal link
*/

const Button = ({ link, content, icon = null }) => {
    return (
        <>
            <Link className={`button ${icon ? icon : ""}`} to={`${import.meta.env.BASE_URL}${link}`}>
                {content}
            </Link>
        </>
    )
};

export default Button;