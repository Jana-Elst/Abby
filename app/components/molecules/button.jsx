import { Link } from "react-router";

//TYPES OF BUTTONS NEEDED
/*
- primary & secondary
- icon vs no-icon (double, front, back)
- external vs internal link
*/

const Button = ({ link, content }) => {
    return (
        <Link to={`${import.meta.env.BASE_URL}${link}`}>
            {content}
        </Link >
    )
};

export default Button;