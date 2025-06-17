import Button from "./button";
import './clockList.css';

const MomentsEmpty = ({ state }) => {
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
                    <p className="empty__text">Momenteel heb je geen lopende momenten.</p>
                    <Button link={"maak-een-abbymoment"} extraClass="empty__btn btn__text yellow__bg">Creëer een moment</Button>
                </div>
            )
        }
        // Future
        if (state.toggle === 'Gepland') {
            return (
                <div className="empty">
                    <p className="empty__text">Momenteel heb je geen geplande momenten</p>
                    <Button link={"maak-een-abbymoment"} extraClass="empty__btn btn__text yellow__bg">Plan een moment</Button>
                </div>
            )
        }
        // Past
        if (state.toggle === 'Afgelopen') {
            return (
                <div className="empty">
                    <p className="empty__text">Je hebt nog geen afgelopen Abbymomenten</p>
                </div>
            )
        }
    }
};

export default MomentsEmpty;