import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from './buttonNext';

import { getDate } from "../../services/clock";
import { locations } from "../../services/museumData";

const Overview = ({ setFormData, formData }) => {
    const date = getDate(formData.scheduledStartTime);

    const allLocations = [
        ...locations,
        { name: 'Ik weet het nog niet', value: 'ik-weet-het-nog-niet', image: '' }
    ];

    const location = allLocations.find(location => location.value === formData.location);

    const now = () => {
        if (formData.flow === 'planNow' || formData.flow === 'now') {
            return true
        }
        return false
    }

    return (
        <>
            <div className="container--form">
                <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
                <p>Overzicht</p>
                <p>Jouw moment:</p>
                <Title extraClass="form__title">{formData.title}</Title>
                <p>Beschrijving:</p>
                {formData.description ? <p>{formData.description}</p> : <p>geen beschrijving</p>}
                <dl>
                    <dt>Waneer:</dt>
                    {now ? <dd>Nu</dd> : `${date.day} ${date.hour}:${date.minutes}`}
                    <dt>Waar:</dt>
                    <dd>{location.name}</dd>
                    <dt>Moment open voor anderen:</dt>
                    <dd>{formData.private ? 'Ja' : 'Nee'}</dd>
                </dl>
            </div>

            {
                now
                    ? <ButtonNext
                        buttonType="submit"
                        extraClass="next__btn btn__text purple__bg"
                        formData={formData}
                        setFormData={setFormData}
                        disabled={!formData.scheduledStartTime}> Start moment
                    </ButtonNext>
                    : <ButtonNext
                        buttonType="submit"
                        extraClass="next__btn btn__text purple__bg"
                        formData={formData}
                        setFormData={setFormData}
                        disabled={!formData.scheduledStartTime}> Maak moment aan
                    </ButtonNext>
            }
        </>
    )
};

export default Overview;