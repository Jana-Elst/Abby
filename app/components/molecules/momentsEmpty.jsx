import Button from "./button";

const MomentsEmpty = ({ state }) => {
    console.log(state);
    //--- All moments
    if (state.page === 'allMoments') {
        // Now
        if (state.toggle === 'Nu bezig') {
            return (
                <>
                    <p>Er zijn geen Abbymomenten bezig op dit moment.</p>
                    <Button>Plan of begin een Abbymoment</Button>
                </>
            )
        }

        // Future
        if (state.toggle === 'gepland') {
            return (
                <>
                    <p>Er zijn geen geplande Abbymomenten</p>
                    <Button>Plan een Abbymoment</Button>
                </>
            )
        }
    }

    //--- Your moments
    // Now
    if (state.page === 'yourMoments') {
        if (state.toggle === 'Nu') {
            return (
                <>
                    <p>Je bent nu niet bezig met een Abbymoment.</p>
                    <Button>Plan of begin een Abbymoment</Button>
                </>
            )
        }
        // Future
        if (state.toggle === 'Gepland') {
            return (
                <>
                    <p>Je hebt geen Abbymomenten gepland</p>
                    <Button>Plan een Abbymoment</Button>
                </>
            )
        }
        // Past
        if (state.toggle === 'Afgelopen') {
            return (
                <>
                    <p>Je hebt geen afgelopen Abbymomenten</p>
                </>
            )
        }
    }
};

export default MomentsEmpty;