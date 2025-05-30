import ClockItem from "./clockItem";
const ClockList= ({clocks = []}) => {
    return (
        <div>
            {clocks.length ? (
                <ul>
                    {clocks.map((clock) => (
                        <ClockItem key={clock.id} clock={clock}/>
                    ))}
                </ul>
            ): (
                <p> no clocks yet </p>
            )}

        </div>
    )
};

export default ClockList;