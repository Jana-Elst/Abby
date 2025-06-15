import Title from "../molecules/title";
import { locations } from "../../services/museumData";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";

import spaceLiving from '../../src/assets/space-living.jpg';
import spaceTuin from '../../src/assets/space-tuin.jpg';
import spaceCafe from '../../src/assets/space-cafe.jpg';
import spaceAtelier from '../../src/assets/space-atelier.jpg';
import spaceSalon from '../../src/assets/space-salon.jpg';
import spaceA from '../../src/assets/space-a.jpg';
import spaceB from '../../src/assets/space-b.jpg';

import { useState } from "react";


const Location = ({ formData, setFormData }) => {
    const locationsRadio = [
        ...locations,
        { name: 'Ik weet het nog niet', value: 'ik-weet-het-nog-niet', image: '' }
    ];

    const images = {
        spaceLiving,
        spaceTuin,
        spaceCafe,
        spaceAtelier,
        spaceSalon,
        'space-a': spaceA,
        'space-b': spaceB
    };

    const [location, setLocation] = useState(formData.location ? locations.find(location => location.value === formData.location) : {});

    return (
        <>
            <div className="container--form">
                <div className="progress__container">
                    <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
                    <div className="progress">
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--future"></div>
                    </div>
                </div>
                <Title extraClass="form__title">Wat is de locatie van jouw moment?</Title>
                <div className="location">
                    {
                        (formData.location !== 'ik-weet-het-nog-niet' && formData.location !== '') && <img className="" src={images[location.image]} alt={`foto van ${location.name}`} />
                    }

                    {
                        locationsRadio.map(location =>
                            <label key={location.value} className="location__btn" htmlFor={location.value}>
                                <input type="radio"
                                    id={location.value}
                                    name="location"
                                    value={location.value}
                                    checked={location.value === formData.location}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            location: e.target.value
                                        })
                                        const location = (locations.find(location => location.value === e.target.value));
                                        console.log(location)
                                        setLocation(location);
                                    }}
                                    disabled={
                                        location.value === 'salon'
                                        || location.value === 'atelier'
                                    }
                                    required

                                />
                                {location.name}
                                {/* <label htmlFor={location}>{location}</label> */}
                            </label>
                        )
                    }
                </div>
                <ButtonNext
                    extraClass="next__btn btn__text purple__bg"
                    formData={formData}
                    setFormData={setFormData}
                    disabled={!formData.location}> Volgende stap </ButtonNext>
            </div>
        </>

    )
};

export default Location;