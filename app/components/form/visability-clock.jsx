import { useState } from 'react';

import Title from "../molecules/title";
import InfoButton from '../../components/molecules/infobutton';
import ButtonBack from './buttonBack';
import ButtonNext from './buttonNext';

import { addPhysicalClock, updateDigitalToPhysical, updatePhysicalToDigital } from "../../services/data";

const VisabilityClock = ({ setFormData, formData }) => {
    const handleChange = async (e) => {
        const value = e.target.value;
        let clockId = formData.clockId;

        if (value === 'wall') {
            console.log('wall');
            if (clockId) {
                clockId = await updateDigitalToPhysical(formData.clockId);
                setFormData({
                    ...formData,
                    clockId: clockId,
                    clockWallPos: "wall"
                });
            } else {
                clockId = await addPhysicalClock(formData.creator);
                setFormData({
                    ...formData,
                    clockId: clockId,
                    clockWallPos: "wall"
                });
            }
        } else {
            console.log('online');
            if (clockId) {
                console.log('ClockId', clockId);
                await updatePhysicalToDigital(formData.clockId);
            }

            setFormData({
                ...formData,
                clockWallPos: 'online'
            });
        }

        console.log('ClockId', clockId);
    }

    return (
        <>
            <div className="container--form">
                <div className="progress__container">
                    {
                        formData.flow === 'planNow'
                            // flow planNow
                            ? <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
                            // flow now
                            : <ButtonBack formData={formData} setFormData={setFormData} link={"qrCode"}>Terug</ButtonBack>
                    }
                    <div className="progress">
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--future"></div>
                        <div className="progress__circle progress__circle--future"></div>
                    </div>
                </div>

                <Title extraClass="form__title">Wil je je moment delen met anderen?</Title>

                {/* <InfoButton>
                    <p><bold>Digitaal</bold></p>
                    <p>Je kan zelf instellen wanneer je klokje start, ideaal als je thuis of onderweg bent. Je klokje verschijnt op de website, maar niet op de muur in het museum.</p>
                    <p><bold>Fysiek</bold></p>
                    <p>Je klokje verschijnt op de grote klokjesmuur zodat iedereen het kan zien. Je kan hier geen andere starttijd plannen.</p>
                    <ul>
                        <li>Klokjes kunnen alleen lopen in Abby.</li>
                        <li>Digtaal kan je kiezen tussen nu starten (alleen aks je aanwezig bent) of later plannen (ook van thuis).</li>
                        <li>Fysiek kan je alleen nu starten, als je fysiek aanwezig bent.</li>
                    </ul>
                </InfoButton> */}
                {
                    formData.clockWallPos === 'wall'
                        ? <p className='foodnote'>Je klokje begint meteen te lopen en verschijnt op de klokjesmuur in Abby.</p>
                        : ""
                }
                {
                    formData.clockWallPos === 'online'
                        ? <p className='foodnote'>Je moment wordt op de site én op de momentenmuur in Abby getoond.</p>
                        : ""
                }

                <div className='visuals'>
                    <label className='visual__btn' htmlFor='wall' >
                        <input type="radio"
                            id="wall"
                            name="visability"
                            value="wall"
                            checked={formData.clockWallPos === "wall"}
                            onChange={handleChange}
                        />
                        Op de klokjes muur
                        {/* <label htmlFor="wall">Op de klokjes muur</label> */}
                    </label>

                    <label className='visual__btn' htmlFor='online'>
                        <input type="radio"
                            id="online"
                            name="visability"
                            value="online"
                            checked={formData.clockWallPos === 'online'}
                            onChange={handleChange}
                        />
                        Online op de website
                        {/* <label htmlFor="online">Online op de website</label> */}
                    </label>
                </div>

                {
                    <ButtonNext extraClass="next__btn btn__text purple__bg" formData={formData} setFormData={setFormData}> Volgende stap </ButtonNext>
                }
            </div>
        </>
    )
};

export default VisabilityClock;