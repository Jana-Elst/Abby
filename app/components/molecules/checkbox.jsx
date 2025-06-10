const Checkbox = ({ content, name, setState, state }) => {
    const onChange = (e) => {
        const value = e.target.value;
        const selection = state.selection

        if (selection.includes(value)) {
            const newState = selection.filter(item => item !== value);
            setState({
                ...state,
                selection: newState
            });
        } else {
            setState({
                ...state,
                selection: [
                    ...selection,
                    value
                ]
            });
        }
    }

    return (
        <div className='checkbox'>
            {
                content.map(item => (
                    <div className='checkbox__item'>
                        <input type="checkbox" id={content} name={name} value={item} onChange={onChange} checked={state.selection.includes(item)}/>
                        <label htmlFor={item}>{item}</label>
                    </div>
                ))
            }
        </div>
    )
};

export default Checkbox;