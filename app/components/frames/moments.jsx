import Button from "../molecules/button";
import ClockList from "../molecules/clockList";
import Title from "../molecules/title";

const Moments = ({ museumClocks }) => {
    return (
        <div className="moments">
            <Title title={'Nu in Abby'} />
            <ClockList clocks={museumClocks} />
            <Button
                link={'abbymomenten'}
                content={'Ontdek alle abbymomenten'}
            />
        </div>
    )
};

export default Moments;