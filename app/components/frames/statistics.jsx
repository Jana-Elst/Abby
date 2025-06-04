import Button from "../molecules/button";
import Title from "../molecules/title";

const Statistics = () => {
    return (
        <div className="statistics">
            <Title
                title={"Zo vult de community Abby"}>
            </Title>
            <p>Deze week lalalal.</p>
            <Button
                link={'abbymomenten'}
                content={'Begin jouw Abbymoment'}
            />
        </div>
    )
};

export default Statistics;