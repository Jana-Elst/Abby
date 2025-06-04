//import './toggleButton.css'

const ToggleButton = ({ content1, content2, state, setState }) => {
    const onChange = (e) => {
        const value = e.target.value
        console.log(value)
        setState(value);
    }

    return (
        <div className={`toggleButton__item`}>
            <div className='toggleButton__item'>
                <input type="radio" id={content1} name="toggleButton" value={content1} onChange={onChange} checked={state === content1} />
                <label htmlFor={content1}>{content1}</label>
            </div>

            <div className={`toggleButton__item`}>
                <input type="radio" id={content2} name="toggleButton" value={content2} onChange={onChange} checked={state === content2} />
                <label htmlFor={content2}>{content2}</label>
            </div>
        </div >
    )
};

export default ToggleButton;