import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from './buttonNext';

import { getDate } from "../../services/clock";
import { locations } from "../../services/museumData";
import './overview.css';

const Overview = ({ setFormData, formData }) => {
    console.log(formData);
    const date = getDate(formData.scheduledStartTime);

    const allLocations = [
        ...locations,
        { name: 'Ik weet het nog niet', value: 'ik-weet-het-nog-niet', image: '' }
    ];

    const location = allLocations.find(location => location.value === formData.location);

    const now = () => {
        if (formData.state === 'now' || formData.state === 'planNow' || formData.state === 'restartNow') {
            return true
        } else {
            return false
        }
    }

    return (
        <div className="container__stretch">
            <div className="container--form">
                <div className="progress__container">
                    <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
                    <p className="h4 purple__fg">Overzicht</p>
                </div>

                <div className="container">
                    <p className="h4 overview__title">Jouw moment:</p>
                    <Title extraClass="h2">{formData.name}</Title>
                    <p className="h4 ">Beschrijving:</p>

                    {formData.description ? <p className="overview__desc">{formData.description}</p> : <p className="empty__description overview__desc">geen beschrijving</p>}
                </div>
            </div>
            <div className="container__stretch--bottom ">
                <dl className="container">
                    <div className="overview__info">
                        <dt className="h4">Wanneer:</dt>
                        <dd>{now() ? 'Nu' : `${date.day} ${date.monthName} ${date.hour}:${date.minutes}`}</dd>
                    </div>
                    <div className="overview__info">
                        <dt className="h4">Waar:</dt>
                        <dd>{location.name}</dd>
                    </div>
                    <div className="overview__info">
                        <dt className="h4">Moment open voor anderen:</dt>
                        <dd>{formData.private ? 'Nee' : 'Ja'}</dd>
                    </div>
                </dl>
                {
                    now()
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
            </div>
        </div>
    )
};

export default Overview;