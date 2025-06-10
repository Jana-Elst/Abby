//react
import { useContext } from "react";

//global variables
import { FormFlowContext, UserContext } from '../root';

//components
import Title from '../components/molecules/title'
import Button from '../components/molecules/button'

const Info = () => {
    const { userId } = useContext(UserContext);
    const { formFlow } = useContext(FormFlowContext);


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
            <>
                <Title>Jouw dag, jouw manier bij Abby</Title>
                <p>Kies jouw moment en vertel wat je doet, van workshop tot koffie, of gewoon even ontspannen. Het kan allemaal. Plan zelf, doe mee aan een Abbymoment, of geniet op jouw eigen tempo.</p>
                <p>Om een Abby moment te starten moet je ingelogd zijn.</p>

                {
                    userId
                        ? <Button link={'maak-een-abbymoment/formulier'}>Maak een Abbymoment</Button>
                        : <Button link={'log-in'}>Log-in</Button>
                }
            </>
        )
    }
};

export default Info;