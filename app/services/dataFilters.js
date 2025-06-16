export const isParticipant = (creator, participants, userId) => {
    if (isCreator(creator, userId)) {
        return false
    }

    if (participants.length > 0) {
        return (participants.includes(userId))
    }

    return false
}

export const isCreator = (creator, userId) => {
    if (userId === creator) {
        return true
    }

    return false
}

export const allParticipants = (clockProfile, clockId) => {
    const participants = clockProfile.filter(cp => cp.clock_id === clockId).map(cp => cp.profile_id);
    return participants
}