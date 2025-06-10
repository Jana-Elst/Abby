import ButtonClockCard from "./buttonClockCard";

const ClockCardPopUp = ({ children, textButton }) => {
    return (
        <div>
            <button>CLOSE</button>
            {children}
            <ButtonClockCard />
        </div>
    )
};

export default ClockCardPopUp;