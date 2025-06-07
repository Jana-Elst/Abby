import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";


const Description = ({ userId, formState, setFormState, formData, setFormData, flowForm, flowKey }) => {
    return (
        <>
            <ButtonBack setFormState={setFormState} formState={formState} flowForm={flowForm}>Terug</ButtonBack>
            <Title title={'Maak je Abbymoment'} />
            <div>
                <input
                    style={{ display: 'none' }}
                    name="userId"
                    defaultValue={userId}
                    type="text"
                />
            </div>

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
            <ButtonNext setFormState={setFormState} formState={formState} flowForm={flowForm} flowKey={flowKey} formData={formData}>Volgende stap</ButtonNext>
        </>

    )
};

export default Description;