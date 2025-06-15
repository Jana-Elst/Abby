import Title from "../molecules/title";
import Button from "../molecules/button";

import momentSlow from "../../src/assets/moment-slow.jpg";
import momentStart from "../../src/assets/moment-start.jpg";
import momentJoin from "../../src/assets/moment-join.jpg";

import arrow from "../../src/assets/arrow-right.svg";

const Abbymoment = () => {
    return (
        <div className="moment" id='Abbymoment'>
            <Title extraClass="moment__title">
                Wat is een <span className="orange__fg">Abbymoment</span>
            </Title>
            <article className="moment__explain">
                <section className="explain">
                    <h3 className="explain__title h4">Een klokje om te vertragen
                        en genieten.</h3>
                    <p className="explain__info purple__bg">In Abby vind je de momentenmuur een muur vol échte momentenklokjes.</p>
                    <img className="explain__img" src={momentSlow} alt="Paarse schilderij" />
                </section>
                <section className="explain">
                    <h3 className="explain__title h4">Start je eigen Abbymoment
                        of plan er één voor in de toekomst.</h3>
                    <p className="explain__info green__bg">Scan de Qr-code in het museum of gebruik deze website.</p>
                    <img className="explain__img" src={momentStart} alt="Groene schilderij" />
                </section>
                <section className="explain">
                    <h3 className="explain__title h4">Neem deel aan iemand anders zijn Abbymoment.</h3>
                    <p className="explain__info yellow__bg">Kies een moment dat al gestart is of vind een gepland moment dat je aanspreekt.</p>
                    <img className="explain__img" src={momentJoin} alt="Gele schilderij" />
                </section>
            </article>
            <Button link={'abbymomenten'} extraClass="btn__text moment__btn orange__bg btn__arrow">
                Bekijk alle Abbymomenten <img className='btn__icon' src={arrow} alt="een pijl"/>
            </Button>
        </div>
    )
};

export default Abbymoment;
