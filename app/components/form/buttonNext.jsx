import arrow from "../../src/assets/arrow-right.svg";

const ButtonNext = ({ children, setFormData, formData, buttonType = 'button', extraClass, disabled = false }) => {
    const handleClickNext = () => {
        setFormData({
            ...formData,
            state: formData.state + 1
        });
    }

    return (
        buttonType === 'button'
            ? <button type='button' onClick={handleClickNext} className={extraClass} disabled={disabled}>
                {children} <img className='btn__icon' src={arrow} alt="een pijl" />
            </button>
            : <button type='submit' className={extraClass} disabled={disabled}>
                {children} <img className='btn__icon' src={arrow} alt="een pijl" />
            </button>
    )
};

export default ButtonNext;