import livingBlue from "../../src/assets/living-blue.png";
import livingHorse from "../../src/assets/living-horse.png";
import livingWood from "../../src/assets/living-wood.png";
import livingRed from "../../src/assets/living-red.png";
import livingGreen from "../../src/assets/living-green.png";
import livingWhite from "../../src/assets/living-white.png";
import livingBlack from "../../src/assets/living-black.png";

const Living = () => {
    return (
        <div className="living" id='living'>
            <img className="living__img living__img--back" src={livingBlack} alt="zwarte stoel" />
            <img className="living__img living__img--middle-back" src={livingWhite} alt="witte stoel" />
            <img className="living__img living__img--middle-back" src={livingGreen} alt="groene zetel" />
            <img className="living__img living__img--middle-front" src={livingRed} alt="rode stoel" />
            <p className="living__title">Kom tot rust in onze living en laat je <span className="living__title-span yellow__bg">inspireren</span></p>
            <img className="living__img living__img--middle" src={livingWood} alt="houten stoel" />
            <img className="living__img living__img--middle" src={livingHorse} alt="wit houten paard" />
            <img className="living__img living__img--front" src={livingBlue} alt="blauwe tafel" />
        </div>
    )
};

export default Living;
