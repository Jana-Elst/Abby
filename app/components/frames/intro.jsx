import Button from "../molecules/button";

const Intro = () => {
    return (
        <div className="intro" id='Intro'>
            <p className="h3">We haasten ons van werk naar huis, van afspraak naar afspraak.</p>
            <p>Haast en spoed is zelden goed.</p>
            <p>Neem je tijd.</p>
            <Button link={'/'}>
                Tijd voor pauze
            </Button>
        </div>
    )
};

export default Intro;