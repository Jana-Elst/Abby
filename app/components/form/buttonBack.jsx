import { Link } from "react-router";

const ButtonBack = ({ children, setFormData, formData, link = null }) => {
    const handleBack = () => {
        setFormData(
            {
                ...formData,
                state: formData.state - 1
            }
        );

        if (formData.flow === 'planNow' && formData.state === 3) {
            setFormData(
                {
                    ...formData,
                    state: formData.state - 2
                }
            );
        }
    }

    if (!link) {
        //button
        return (
            <button type='button' onClick={handleBack}>
                {children}
            </button>
        )
    } else {
        //navlink
        return (
            <Link to={`${import.meta.env.BASE_URL}${link}`}>
                {children}
            </Link>
        )
    }
};

export default ButtonBack;