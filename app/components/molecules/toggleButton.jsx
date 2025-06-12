//import './toggleButton.css'

//@henri zorg hier dat de active state een BGkleur krijgt, ik zal zorgen dat die kluer anders is voor Afgelopen gepland en nu
const ToggleButton = ({ contents, state, setState }) => {
    const onChange = (e) => {
        const value = e.target.value
        console.log(value)
        setState({
            ...state,
            toggle: value
        });
    }

    return (
        <div className={`toggleButton__item`}>
            {
                contents.values.map(value => {
                    return (
                        <div className='toggleButton__item'>
                            <input type="radio" id={value} name={contents.name} value={value} onChange={onChange} checked={state.toggle === value} />
                            <label htmlFor={value}>{value}</label>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default ToggleButton;