import Title from "../molecules/title";
import Button from "../molecules/button";

import homeHero from "../../src/assets/home-hero.png";

const Hero = () => {
    return (
        <div className="hero">
            <Title className="hero__title">
                Rush jij ook door het <span className="green__fg">leven</span>
            </Title>
            <p className="hero__header">Tijd om het wat rustiger aan te doen.</p>
            {/* <Button link={'#Abby'} icon={'skip'}>
                Sla over
            </Button> */}
            {/* clock COMP */}
            <img className="hero__img" src={homeHero} alt="De Living van Abby" />
            <Button link={'#Intro'} extraClass="btn__text hero__btn">
                Waarom vertragen?
            </Button>
        </div >
    )
};

export default Hero;

