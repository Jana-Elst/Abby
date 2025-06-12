import Title from "../molecules/title";
import Button from "../molecules/button";

import momentSlow from "../../src/assets/moment-slow.jpg";
import momentStart from "../../src/assets/moment-start.jpg";
import momentJoin from "../../src/assets/moment-join.jpg";

const Abbymoment = () => {
    return (
        <div className="moment" id='Abbymoment'>
            <Title extraClass="moment__title">
                Wat is een <span className="orange__fg">Abbymoment</span>
            </Title>
            <article className="moment__explain">
                <section className="explain">
                    <h3 className="explain__title h4">Een klokje om te <span className="explain__title-span">vertragen
                        en genieten</span>.</h3>
                    <p className="explain__info purple__bg">In Abby vind je de momentenmuur een muur vol échte momentenklokjes.</p>
                    <img className="explain__img" src={momentSlow} alt="Paarse schilderij" />
                </section>
                <section className="explain">
                    <h3 className="explain__title h4"><span className="explain__title-span">Start</span> je eigen Abbymoment
                        of <span className="explain__title-span">plan</span> er één voor in de toekomst.</h3>
                    <p className="explain__info green__bg">Scan de Qr-code in het museum of gebruik deze website.</p>
                    <img className="explain__img" src={momentStart} alt="Groene schilderij" />
                </section>
                <section className="explain">
                    <h3 className="explain__title h4"><span className="explain__title-span">Neem deel</span> aan iemand anders zijn Abbymoment.</h3>
                    <p className="explain__info yellow__bg">Kies een moment dat al gestart is of vind een gepland moment dat je aanspreekt.</p>
                    <img className="explain__img" src={momentJoin} alt="Gele schilderij" />
                </section>
            </article>
            <Button link={'#Intro'} extraClass="btn__text moment__btn orange__bg">
                Bekijk alle Abbymomenten
            </Button>
        </div>
    )
};

export default Abbymoment;
