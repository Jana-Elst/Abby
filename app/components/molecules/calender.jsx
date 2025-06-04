const Calender = ({ setState, state, id }) => {
    const onChange = (e) => {
        const value = e.target.value;
        setState(value);
    }

    console.log(state);

    return (
        <input
            type="date"
            id={id}
            name={id}
            value={state}
            min="2025-01-01"
            max="2025-12-31"
            onChange={onChange}
        />
    )
};

export default Calender;