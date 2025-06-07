import Title from "../molecules/title";
import Button from "../molecules/button";

const Hero = () => {
    return (
        <div className="hero">
            <Title
                title={"Rush jij ook door het leven?"}>
            </Title>
            <p>Tijd om het wat rustiger aan te doen.</p>
            <Button link={'#Abby'} icon={'skip'}>
                Sla over
            </Button>
            {/* clock COMP */}
            <Button link={'#Intro'}>
                Waarom vertragen?
            </Button>
        </div >
    )
};

export default Hero;

