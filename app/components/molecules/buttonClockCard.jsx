const ButtonClockCard = ({ userId, clock, participants, state }) => {
    const toggleState = state.toggle;

    //-- set correct bg color
    let backgroundColor;
    let backgroundImage;
    if (toggleState === 'Nu' || toggleState === '') {
        backgroundColor = ''; //@henri set classname for blueBg
        backgroundImage = '';
    } else if (toggleState === 'Gepland') {
        backgroundColor = ''; //@henri set classname for orangeBg
        backgroundImage = '';
    } else if (toggleState === 'Afgelopen') {
        backgroundColor = ''; //@henri set classname for yellowBg
        backgroundImage = '';
    }

    //--- different buttons
    //creator
    if (userId === clock.creator) {
        return <p>Jouw Abbymoment --></p>
    }

    //made by Abby
    if (clock.abbyMoment) {
        return <p className={(participants.includes(userId)) ? backgroundImage : ''}>made by Abby --></p>
    }

    //normal or participant
    else {
        return <p className={(participants.includes(userId)) ? backgroundColor : ''}>--></p>
    }
};

export default ButtonClockCard;