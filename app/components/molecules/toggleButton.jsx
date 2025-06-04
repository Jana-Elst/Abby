import './toggleButton.css'

const ToggleButton = ({ content1, content2 }) => {
    return (
        <div className='toggleButton'>
            <div className='toggleButton__item active'>
                <input type="radio" id={content1} name="toggleButton" value={content1} defaultChecked />
                <label htmlFor={content1}>{content1}</label>
            </div>

            <div className='toggleButton__item'>
                <input type="radio" id={content2} name="toggleButton" value={content2} />
                <label htmlFor={content2}>{content2}</label>
            </div>
        </div>
    )
};

export default ToggleButton;