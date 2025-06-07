import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";

const Participants = ({ setFormState, formState, flowForm, flowKey, formData, setFormData }) => {
    return (
        <>
            <ButtonBack setFormState={setFormState} formState={formState} flowForm={flowForm}>Terug</ButtonBack>
            <Title title={"Wil je je moment delen met anderen?"} />
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
                <label htmlFor="true">Nee, Ik heb liever een Abbymoment voor mij alleen.</label>
            </div>

            {
                flowForm === "now"
                    ? <ButtonNext
                        buttonType='submit'
                        setFormState={setFormState}
                        formState={formState}
                        flowForm={flowForm}
                        flowKey={flowKey}
                        formData={formData}
                    > Start je Abbymoment </ButtonNext>
                    : <ButtonNext
                        buttonType='submit'
                        setFormState={setFormState}
                        formState={formState}
                        flowForm={flowForm}
                        flowKey={flowKey}
                        formData={formData}
                    > Plan je Abbymoment </ButtonNext>
            }
        </>
    )
};

export default Participants