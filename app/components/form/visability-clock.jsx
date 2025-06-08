import { useState } from 'react';

import Title from "../molecules/title";
import InfoButton from '../../components/molecules/infobutton';
import ButtonBack from './buttonBack';
import ButtonNext from './buttonNext';

import { createNewClock, removeWallPos } from "../../services/data";

const VisabilityClock = ({ setFormState, formState, setFlowForm, flowForm, formData, flowKey, setFormData }) => {
    const [visability, setVisability] = useState("Op de klokjes muur");

    return (
        <>
            <ButtonBack setFormState={setFormState} formState={formState} flowForm={flowForm}>Terug</ButtonBack>
            <Title title={"Wil je je moment delen met anderen?"} />
            <InfoButton>
                <p><bold>Digitaal</bold></p>
                <p>Je kan zelf instellen wanneer je klokje start, ideaal als je thuis of onderweg bent. Je klokje verschijnt op de website, maar niet op de muur in het museum.</p>
                <p><bold>Fysiek</bold></p>
                <p>Je klokje verschijnt op de grote klokjesmuur zodat iedereen het kan zien. Je kan hier geen andere starttijd plannen.</p>
                <ul>
                    <li>Klokjes kunnen alleen lopen in Abby.</li>
                    <li>Digtaal kan je kiezen tussen nu starten (alleen aks je aanwezig bent) of later plannen (ook van thuis).</li>
                    <li>Fysiek kan je alleen nu starten, als je fysiek aanwezig bent.</li>
                </ul>
            </InfoButton>

            <div>
                <div>
                    <input type="radio"
                        id="wall"
                        name="visability"
                        value="wall"
                        checked={formData.clockWallPos === "wall"}
                        onChange={(e) => {
                            let clockId;
                            if (formData.clockWallPos === 'online') {
                                console.log(formData.creator);
                                clockId = createNewClock(formData.creator).id;
                                console.log(clockId);
                                setFormData({
                                    ...formData,
                                    clockId: clockId
                                })
                            };
                            setFormData({
                                ...formData,
                                clockWallPos: "wall"
                            });
                        }}
                    />
                    <label htmlFor="wall">Op de klokjes muur.</label>
                </div>

                <div>
                    <input type="radio"
                        id="online"
                        name="visability"
                        value="online"
                        checked={formData.clockWallPos === 'online'}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                clockWallPos: "online"
                            })
                        }}
                    />
                    <label htmlFor="online">Online op de website</label>
                </div>
            </div>

            {
                visability === 'Op de klokjes muur'
                    ? <p>Je klokje begint meteen te lopen en verschijnt op de klokjesmuur in Abby.</p>
                    : ""
            }

            {
                flowForm === 'now'
                    ? <ButtonNext
                        buttonType='button'
                        setFormState={setFormState}
                        formState={formState}
                        flowForm={flowForm}
                        flowKey={flowKey}
                        formData={formData}
                    > Maak een Abbymoment </ButtonNext>
                    : <ButtonNext
                        buttonType='button'
                        setFormState={setFormState}
                        formState={formState}
                        flowForm={flowForm}
                        flowKey={flowKey}
                        formData={formData}
                    > Volgende stap </ButtonNext>

            }
        </>
    )
};

export default VisabilityClock;