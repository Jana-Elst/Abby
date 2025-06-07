const ButtonBack = ({ children, setFormState, formState, flowForm }) => {
    const handleBack = () => {
        setFormState(formState - 1);

        console.log(flowForm);
        console.log(formState)
        if (flowForm === 'planNow' && formState === 4) {
            console.log('hey');
            setFormState(formState - 2);
        }
    }

    return (
        <button onClick={handleBack}>
            {children}
        </button>
    )
};

export default ButtonBack;