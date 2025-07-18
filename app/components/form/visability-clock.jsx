import { useState } from 'react';

import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from './buttonNext';

import { addPhysicalClock, removePhysical } from "../../services/data";

const VisabilityClock = ({ setFormData, formData }) => {
    const [touched, setTouched] = useState(false);

    const handleChange = async (e) => {
        const value = e.target.value;
        let clockId = formData.clockId;

        if (value === 'wall') {
            clockId = await addPhysicalClock(formData.creator);
            setFormData({
                ...formData,
                clockId: clockId,
                clockWallPos: "wall"
            });
        } else {
            if (clockId) {
                removePhysical(clockId);
            }

            setFormData({
                ...formData,
                clockId: '',
                clockWallPos: 'online'
            });
        }
    }

    const handleBack = (clockId) => {
        if (clockId) {
            removePhysical(clockId);
        }

        setFormData({
            ...formData,
            clockId: '',
            clockWallPos: '',
        });
    }

    return (
        <div className='container__stretch'>
            <div className="container--form">
                <div className="progress__container">
                    {
                        formData.flow === 'planNow'
                            // flow planNow
                            ? <ButtonBack
                                formData={formData}
                                setFormData={setFormData}
                                onClick={() => handleBack(formData.clockId)}>Terug
                            </ButtonBack>
                            // flow now
                            : <ButtonBack
                                formData={formData}
                                setFormData={setFormData}
                                link={"qrCode"}
                                onClick={() => handleBack(formData.clockId)}>Terug
                            </ButtonBack>
                    }
                    <div className="progress">
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--future"></div>
                        <div className="progress__circle progress__circle--future"></div>
                    </div>
                </div>

                <Title extraClass="form__title">Kies waar jouw moment zichtbaar wordt</Title>
                {
                    formData.clockWallPos === 'wall'
                        ? <p className='foodnote'>Je moment wordt op de site én op de momentenmuur in Abby getoond.</p>
                        : ""
                }
                {
                    formData.clockWallPos === 'online'
                        ? <p className='foodnote'>Je moment wordt op onze site getoond, maar niet op de momentenmuur in Abby</p>
                        : ""
                }
            </div>
            <div>
                <div className='visuals'>
                    <label className='visual__btn' htmlFor='online'>
                        <input type="radio"
                            id="online"
                            name="visability"

                            value="online"
                            checked={formData.clockWallPos === 'online'}
                                   onChange={(e) => {
                                handleChange(e);
                                setTouched(true);

                            }}
                            required
                        />
                        Online op de website
                        {/* <label htmlFor="online">Online op de website</label> */}
                    </label>

                    <label className='visual__btn' htmlFor='wall' >
                        <input type="radio"
                            id="wall"
                            name="visability"

                            value="wall"
                            checked={formData.clockWallPos === "wall"}
                            onChange={(e) => {
                                handleChange(e);
                                setTouched(true);
                            }}
                            disabled = {formData.isFree}
                            required
                        />
                        Fysiek op de momenentenmuur
                        {/* <label htmlFor="wall">Op de klokjes muur</label> */}
                    </label>
                </div>

                {
                    <ButtonNext
                        extraClass="next__btn btn__text purple__bg"
                        formData={formData}
                        setFormData={setFormData}
                        disabled={!formData.clockWallPos}
                    > Volgende stap </ButtonNext>
                }
            </div>
        </div>
    )
};

export default VisabilityClock;