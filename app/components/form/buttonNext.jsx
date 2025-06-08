const ButtonNext = ({ children, setFormState, formState, flowForm, formData, flowKey, buttonType = 'button' }) => {
    const handleNext = () => {
        console.log(formData);
        setFormState(formState + 1);
    }

    const formValidation = () => {
        if (flowKey === 'description') {
            if (formData.name === '') {
                return alert('Please enter your name');
            } else {
                handleNext();
            }

        } else if (flowKey === 'location') {
            if (formData.location === '') {
                return alert('Please select a location');
            } else {
                handleNext();
            }

        } else if (flowKey === 'participants') {
            if (formData.private === '') {
                return alert('Please select a location');
            } else {
                handleNext();
            }

        } else if (flowKey === 'time') {
            if (formData.scheduledStartTime === null) {
                return alert('Please select a startTime');
            } else {
                handleNext();
            }
        } else {
            handleNext();
        }
    }

    return (
        buttonType === 'button'
            ? <button type='button' onClick={formValidation}>
                {children}
            </button>
            : <button type='submit'>
                {children}
            </button>
    )
};

export default ButtonNext;