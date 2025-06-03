const ClockItem = ({clock}) => {
    return (
       <li>
        <p>{clock.name}</p>
        <p>{clock.startTime}</p>
       </li>
    )
};

export default ClockItem;