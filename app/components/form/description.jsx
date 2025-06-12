import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";


const Description = ({ formData, setFormData }) => {
    return (
        <>
            {/* different actions for return buttons in different flows */}
            {/* <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack> */}
            {/*  */}

            <Title>Maak je Abbymoment</Title>
            <div>
                <div>
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
                <div>
                    <label htmlFor="description">Beschrijving</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        maxLength="300"
                        placeholder='max. 300 karakters'
                        rows={5}
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
        </>

    )
};

export default Description;