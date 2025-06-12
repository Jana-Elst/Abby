import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";
import "./form.css";


const Description = ({ formData, setFormData }) => {
    return (
        <div className="container container--form">
            <div className="progress__container">
                {/* different actions for return buttons in different flows */}
                {
                    formData.flow === 'now' && 'planNow'
                        // flow now & planNow
                        ? <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
                        // flow now
                        : <ButtonBack formData={formData} setFormData={setFormData} link={"maak-een-abbymoment"}>Terug</ButtonBack>
                }
                {/*  */}
                <div className="progress">
                    <div className="progress__circle progress__circle--active--now"></div>
                    <div className="progress__circle progress__circle--future"></div>
                    <div className="progress__circle progress__circle--future"></div>
                </div>
            </div>
            <Title>Maak je Abbymoment</Title>
            <div>
                <div className="form__question">
                    <label htmlFor="name">Titel</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        maxLength="40"
                        placeholder='Titel'
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            });
                        }}
                        required />
                </div>
                <div className="form__question">
                    <label htmlFor="description">Beschrijving</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        maxLength="300"
                        placeholder='max. 300 karakters'
                        rows={30}
                        cols={20}
                        value={formData.description}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            });
                        }}
                    />
                </div>
            </div>
            <ButtonNext formData={formData} setFormData={setFormData}>Volgende stap</ButtonNext>
        </div>

    )
};

export default Description;