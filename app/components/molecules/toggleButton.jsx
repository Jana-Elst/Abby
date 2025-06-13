import './toggleButton.css'

//@henri zorg hier dat de active state een BGkleur krijgt, ik zal zorgen dat die kluer anders is voor Afgelopen gepland en nu
const ToggleButton = ({ contents, state, setState, colourClass }) => {
    const onChange = (e) => {
        const value = e.target.value
        console.log(value)
        setState({
            ...state,
            toggle: value
        });
    }

    return (
        <div className={`toggleButton `}>
            {
                contents.values.map(value => {
                    return (
                        <div key={value} className={`toggleButton__item ${colourClass ? colourClass : ""}`} >
                            <input className="input" type="radio" id={value} name={contents.name} value={value} onChange={onChange} checked={state.toggle === value} />
                            <label className='btn__text' htmlFor={value}>{value}</label>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default ToggleButton;