import Button from "./button";
import './clockList.css';

const MomentsEmpty = ({ state }) => {
    console.log(state);
    //--- All moments
    if (state.page === 'allMoments') {
        // Now
        if (state.toggle === 'Nu bezig') {
            return (
                <div className="empty">
                    <p className="empty__text">Er zijn geen Abbymomenten bezig op dit moment.</p>
                    <Button link={"maak-een-abbymoment"} extraClass="empty__btn btn__text yellow__bg">Creëer een moment</Button>
                </div>
            )
        }

        // Future
        if (state.toggle === 'Gepland') {
            return (
                <div className="empty">
                    <p className="empty__text">Er zijn geen geplande Abbymomenten</p>
                    <Button link={"maak-een-abbymoment"} extraClass="empty__btn btn__text yellow__bg">Creëer een moment</Button>
                </div>
            )
        }
    }

    //--- Your moments
    // Now
    if (state.page === 'yourMoments') {
        if (state.toggle === 'Nu') {
            return (
                <div className="empty">
                    <p className="empty__text">Je bent nu niet bezig met een Abbymoment.</p>
                    <Button link={"maak-een-abbymoment"} extraClass="empty__btn btn__text yellow__bg">Plan een moment</Button>
                </div>
            )
        }
        // Future
        if (state.toggle === 'Gepland') {
            return (
                <div className="empty">
                    <p className="empty__text">Je hebt geen Abbymomenten gepland</p>
                    <Button link={"maak-een-abbymoment"} extraClass="empty__btn btn__text yellow__bg">Plan een moment</Button>
                </div>
            )
        }
        // Past
        if (state.toggle === 'Afgelopen') {
            return (
                <div className="empty">
                    <p className="empty__text">Je hebt geen afgelopen Abbymomenten</p>
                </div>
            )
        }
    }
};

export default MomentsEmpty;