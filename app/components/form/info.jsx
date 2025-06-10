//react
import { useContext } from "react";

//global variables
import { UserContext } from '../../root';

//components
import Title from '../molecules/title'
import Button from '../molecules/button'
import ButtonNext from "./buttonNext";

const Info = ({ formData, setFormData, setFlowForm }) => {
    const { userId } = useContext(UserContext);

    const handleClickNext = () => {
        setFormData({
            ...formData,
            state: formData.state + 1
        });
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        if (e.target.value === 'scheduled') {
            setFormData({
                ...formData,
                flow: 'startScheduled',
                state: formData.state + 1
            });
            setFlowForm('startScheduled');
        } else {
            setFormData({
                ...formData,
                state: formData.state + 1
            });
        }
    }

    if (formData.flow === 'now') {
        return (
            <>
                <Title> Wat wil jij vandaag doen ?</Title >
                {
                    userId
                        ? <div>
                            <div>
                                <input type="radio"
                                    id="scheduled"
                                    name="now"
                                    value="scheduled"
                                    onChange={(e) => handleChange(e)}
                                />
                                <label htmlFor="scheduled">Start een gepland Abbymoment</label>
                            </div>

                            <div>
                                <input type="radio"
                                    id="make"
                                    name="now"
                                    value="make"
                                    onChange={(e) => handleChange(e)}
                                />
                                <label htmlFor="online">Maak een Abbymoment</label>
                            </div>
                        </div>

                        : <div>
                            <p>Om een Abbymoment the starten moet je ingelogd zijn.</p>
                            <Button link={'log-in'}>Log-in</Button>
                        </div>
                }
            </>
        )

    } else {
        return (
            <div className="info__container">
                <Title className="info__title" >Jouw dag, jouw manier bij Abby</Title>
                <p className="info__p">Kies jouw moment en vertel wat je doet, van workshop tot koffie, of gewoon even ontspannen. Het kan allemaal.</p>
                <p className="info__p"> Plan zelf, doe mee aan een Abbymoment, of geniet op jouw eigen tempo.</p>
                <p className="info__note">Om een Abby moment te starten moet je ingelogd zijn.</p>

                {
                    userId
                        ? <ButtonNext setFormData={setFormData} formData={formData}>Maak een Abbymoment</ButtonNext>
                        : <Button link={'log-in'} onClick={handleClickNext}>Log-in</Button>
                }
            </div>
        )
    }
};

export default Info;