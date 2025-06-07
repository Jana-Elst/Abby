import Button from "../molecules/button";
import ClockList from "../molecules/clockList";
import Title from "../molecules/title";

const Moments = ({ museumClocks }) => {
    return (
        <div className="moments">
            <Title title={'Nu in Abby'} />
            <ClockList clocks={museumClocks} />
            <Button link={'abbymomenten'}>
                Ontdek alle abbymomenten
            </Button>
        </div >
    )
};

export default Moments;