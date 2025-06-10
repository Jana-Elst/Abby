import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";

const Participants = ({ setFormState, formState, flowForm, flowKey, formData, setFormData }) => {
    return (
        <>
            <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
            <Title>Wil je je moment delen met anderen?</Title>
            <div>
                <div>
                    <input type="radio"
                        id="false"
                        name="participants"
                        value="false"
                        checked={formData.private === false}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                private: e.target.value === "true" ? true : false
                            })
                        }}
                    />
                    <label htmlFor="false">Ja, hoe meer zielen hoe meer vreugd.</label>
                </div>

                <div>
                    <input type="radio"
                        id="true"
                        name="participants"
                        value="true"
                        checked={formData.private === true}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                private: e.target.value === "false" ? false : true
                            })
                        }}
                    />
                    <label htmlFor="true">Nee, Ik heb liever een Abbymoment alleen.</label>
                </div>
            </div>

            {
                formData.flow === "now" || formData.flow === 'planNow'
                    ? <ButtonNext
                        buttonType='submit'
                        formData={formData}
                        setFormData={setFormData}
                    > Start je Abbymoment </ButtonNext>
                    : <ButtonNext
                        buttonType='submit'
                        formData={formData}
                        setFormData={setFormData}
                    > Plan je Abbymoment </ButtonNext>
            }
        </>
    )
};

export default Participants