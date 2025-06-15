import "./form.css";

// components
import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";
import TimeInput from "./timeInput";

const Time = ({ setFlowForm, flows, formData, setFormData }) => {
    const baseFlow = formData.state === 0 ? 'restartMoment' : 'plan';

    const handleChangeFlow = (e) => {
        console.log(e.target.value);
        setFormData({
            ...formData,
            flow: `${baseFlow}${e.target.value === 'now' ? 'Now' : ""}`
        });

        setFlowForm(`${baseFlow}${e.target.value === 'now' ? 'Now' : ""}`);
    }

    const timeOptions = [
        { value: 'now', label: 'Nu' },
        { value: 'later', label: 'Later' }
    ]

    return (
        <>
            <div className="container--form">
                <div className="progress__container">
                    <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
                    <div className="progress">
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--future"></div>
                        <div className="progress__circle progress__circle--future"></div>
                    </div>
                </div>
                <Title extraClass="form__title">Wanneer is je Abbymoment?</Title>

                {/* toggle now later */}
                {
                    formData.flow === baseFlow && <TimeInput extraClass="time" formData={formData} setFormData={setFormData} />
                }
                <div className="date">
                    {timeOptions.map((option) => (
                        <label
                            key={option.value}
                            className={`date__${option.value}`}
                            htmlFor={option.value}
                        >
                            <input
                                type="radio"
                                id={option.value}
                                name="time"
                                value={option.value}
                                checked={formData.flow === `${baseFlow}${option.value === 'now' ? 'Now' : ''}`}
                                onChange={(e) => handleChangeFlow(e)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>

                {/* check if form should be submit */}
                {
                    flows[formData.flow].length > 2 ?
                        <ButtonNext extraClass="next__btn btn__text purple__bg" formData={formData} setFormData={setFormData}> Volgende stap </ButtonNext>
                        : <ButtonNext buttonType="submit" extraClass="next__btn btn__text purple__bg" formData={formData} setFormData={setFormData}> Maak moment aan</ButtonNext>

                }
            </div>
        </>
    );
};

export default Time;
