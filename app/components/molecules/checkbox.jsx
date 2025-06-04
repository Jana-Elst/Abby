const Checkbox = ({ content, name, setState, state }) => {
    const onChange = (e) => {
        const value = e.target.value;

        if (state.includes(value)) {
            const newState = state.filter(item => item !== value);
            setState(newState);
        } else {
            setState([
                ...state,
                value
            ]
            )
        }
    }

    console.log(state);

    return (
        <div className='checkbox'>
            {
                content.map(item => (
                    <div className='checkbox__item'>
                        <input type="checkbox" id={content} name={name} value={item} onChange={onChange} />
                        <label htmlFor={item}>{item}</label>
                    </div>
                )
                )
            }
        </div>
    )
};

export default Checkbox;