const ButtonBack = ({ children, setFormData, formData }) => {
    const handleBack = () => {
        setFormData(
            {
                ...formData,
                state: formData.state - 1
            }
        );

        if (formData.flow === 'planNow' && formData.state === 4) {
            console.log('hey');
            setFormData(
                {
                    ...formData,
                    state: formData.state - 2
                }
            );
        }
    }

    return (
        <button type='button' onClick={handleBack}>
            {children}
        </button>
    )
};

export default ButtonBack;