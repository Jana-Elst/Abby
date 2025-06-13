import arrow from "../../src/assets/arrow-right.svg";

const ButtonClockCard = ({ userId, clock, participants }) => {
    //--- different buttons
    //creator
    if (userId === clock.creator) {
        return <p className="purple__bg"> Jouw Abbymoment  <img className='btn__icon' src={arrow} alt="een pijl"/> </p>
    }

    //made by Abby
    if (clock.abbyMoment) {
        return <p className={(participants.includes(userId)) ? 'bg-img__green' : 'bg-img__none'}>made by Abby  <img className='btn__icon' src={arrow} alt="een pijl"/> </p>
    }

    //normal
    else {
        console.log(userId);
        console.log(participants);
        
        return <p className={(participants.includes(userId)) ? 'green__bg' : ''}> <img className='btn__icon' src={arrow} alt="een pijl"/></p>
    }
};

export default ButtonClockCard;