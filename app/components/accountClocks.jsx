import ClockItem from "./clockItem";

const AccountClocks = ({userClocks}) => {
    return (
        <div>
            {userClocks.length ? (
                <ul>
                    {userClocks.map((clock) => (
                        <ClockItem key={clock.id} clock={clock}/>
                    ))}
                </ul>
            ): (
                <p> no clocks saved yet </p>
            )}

        </div>
    )
};

export default AccountClocks;