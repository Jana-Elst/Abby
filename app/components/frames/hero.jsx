import Title from "../molecules/title";
import Button from "../molecules/button";

import homeHero from "../../src/assets/home-hero.png";
import arrowDown from "../../src/assets/arrow-down.svg";

const Hero = () => {
    return (
        <>
            <div className="hero">
                <Title extraClass="hero__title">
                    Rush jij ook door het <span className="green__fg">leven</span>
                </Title>
                <p className="hero__header">Tijd om het wat rustiger aan te doen.</p>
                <img className="hero__img" src={homeHero} alt="De klokjes muur in Abby" />
            </div >
            <Button link={'#Intro'} extraClass="btn__text btn__arrow hero__btn blue__bg">
                Vertraag jij mee?
                <img className='btn__icon' src={arrowDown} alt="een pijl ide naar beneden wijst" />
            </Button>
        </>
    )
};

export default Hero;

