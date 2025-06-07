import Title from "../molecules/title";

const Description = ({ userId, formState, setFormState, formData, setFormData, flowForm }) => {
    const handleClickNext = () => {
        if (flowForm === 'now') {
            setFormState('location');
        } else {
            setFormState('time');
        }
    }

    return (
        <>
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
            <button onClick={handleClickNext}>Volgende stap</button>
        </>

    )
};

export default Description;