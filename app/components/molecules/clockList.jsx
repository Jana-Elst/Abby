import ClockCard from "./clockCard";
const ClockList = ({ clocks = [], clockProfile }) => {
    return (
        <div>
            {clocks.length ? (
                <ul>
                    {clocks.map((clock) => (
                        <ClockCard key={clock.id} clock={clock} clockProfile={clockProfile} />
                    ))}
                </ul>
            ) : (
                <p> no clocks yet </p>
            )}

        </div>
    )
};

export default ClockList;