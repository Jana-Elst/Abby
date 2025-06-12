//react
import { useContext } from "react";

//global variables
import { UserContext } from '../context/UserContext';
import { FormFlowContext } from '../context/FormFlowContext';

//components
import Title from '../components/molecules/title';
import Button from '../components/molecules/button';

//styling
import "./createAbbymomentStart.css";

const Info = () => {
    const { userId } = useContext(UserContext);
    const { formFlow, setFlowForm } = useContext(FormFlowContext);
    console.log(userId);


    const handleChange = (e) => {
        console.log(e.target.value);
        if (e.target.value === 'scheduled') {
            setFlowForm('startScheduled');
        }
    }


    if (formFlow === 'now') {
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
                                <label htmlFor="online">Maak een nieuw Abbymoment</label>
                            </div>
                        </div>

                        : <div>
                            <p className="info__note yellow__bg btn__text">Om een Abbymoment the starten moet je ingelogd zijn.</p>
                            <Button link={'log-in'}>Log-in</Button>
                        </div>
                }
            </>
        )

    } else {
        return (
            <div className="info__container">
                <Title className="info__title">Jouw dag, jouw manier bij Abby</Title>
                <p className="info__p">Kies jouw moment en vertel wat je doet, van workshop tot koffie, of gewoon even ontspannen. Het kan allemaal.</p>
                <p className="info__p">Begin direct een moment in Abby of plan er eentje voor later. Rust uit op jezelf of samen met anderen.</p>

                <div className="info__btn__container">
                    {
                        userId
                            ? (<Button extraClass="info__btn yellow__bg btn__text" link={'maak-een-abbymoment/formulier'}>Start</Button>)
                            : (
                                <>
                                    <p className="info__note">Om een Abby moment te starten moet je ingelogd zijn.</p>
                                    <Button extraClass="info__btn yellow__bg btn__text" link={'log-in'}>Log in</Button>
                                </>
                            )
                    }
                </div>
            </div>
        )
    }
};

export default Info;