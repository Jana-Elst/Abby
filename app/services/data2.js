import { supabase } from "../supabaseClient";
import { totalClocks } from "./museumData";

/*
Handful of helper functions to be called from route loaders and actions
and insert or delete things from the database
*/

//------------------- Get userId -------------------//
export const getUserId = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user?.id;
};


//------------------- Get or update things from the database -------------------//
const getOrUpdateClocks = async (query) => {
    try {
        let { data, error } = await query;
        return data
    } catch (error) {
        console.error("Error fetching museum clocks:", error);
        throw error;
    }
}

//get all clocks in the museum
export const allActiveClocks = async () => {
    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select('*')
            .not('clockWallPos', 'is', null)
    );
    return data
}

//get all clocks
export const getAllClocks = async () => {
    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select('*')
    );
    return data
}

//get all profiles and clockIds
export const getClockProfile = async () => {
    const data = await getOrUpdateClocks(
        supabase
            .from('clockprofile')
            .select('*')
    );
    return data
}

//get all clockID's from one user
export const getClocksUser = async () => {
    const userId = await getUserId();

    const data = await getOrUpdateClocks(
        supabase
            .from('clockprofile')
            .select('*')
            .eq('profile_id', userId)
    );
    return data
}

//get just one clock by ID
export const getClock = async (id) => {
    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select('*')
            .eq('id', id)
    );
    return data
}

//update clock from physical to digital
export const updatePhysicalToDigital = async (id) => {
    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .update({
                clockWallPos: null,
            })
            .eq('id', id)
    );
    return data
}

//update clock from physical to digital
export const updateDigitalToPhysical = async (id) => {
    const time = getTimeNow();
    const clockNumber = await getRandomClockNumber();

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .update({
                clockWallPos: clockNumber,
                startTime: time,
            })
            .eq('id', id)
    );
    return data
}

//update clock & start it
export const startWallClock = async (id, name, description, prive, location) => {
    const time = getTimeNow();

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .update({
                name: name,
                description: description,
                startTime: time,
                scheduledStartTime: time,
                private: prive,
                location: location
            })
            .eq('id', id)
    );
    return data
}

//stop clock
export const stopClock = async (id) => {
    const time = getTimeNow();
    console.log(id, time);

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .update({
                stopTime: time,
                // scheduledStopTime: time,
            })
            .eq('id', id)
    );
    return data
}

//------------------- Add a row -------------------//
const addRow = async (query) => {
    const userId = await getUserId();

    try {
        let { data, error } = await query;
        let joinQuery = supabase
            .from('clockprofile')
            .insert({ profile_id: userId, clock_id: data.id });
        await joinQuery;

        return data;
    } catch (error) {
        console.error("Error inserting clock:", error);
        throw error;
    }
}

//add a new planned clock
export const addScheduledClock = async (name, description, scheduledStartTime, prive, location) => {
    const userId = await getUserId();

    const data = await addRow(
        supabase
            .from('clocks')
            .insert({
                name: name,
                description: description,
                scheduledStartTime: new Date(scheduledStartTime).toISOString(),
                private: prive,
                location: location,
                creator: userId
            }).select()
            .single(),
        userId
    )

    return data
}

export const startOnlineClock = async (name, description, prive, location) => {
    const userId = await getUserId();

    const time = getTimeNow();

    const data = await addRow(
        supabase
            .from('clocks')
            .insert({
                name: name,
                description: description,
                scheduledStartTime: time,
                startTime: time,
                private: prive,
                location: location,
                creator: userId
            }).select()
            .single(),
        userId
    )

    return data
}

//add clock for now physical
export const addPhysicalClock = async () => {
    const userId = await getUserId();

    const time = getTimeNow();
    const clockNumber = await getRandomClockNumber();

    const data = await addRow(
        supabase
            .from('clocks')
            .insert({
                clockWallPos: clockNumber,
                creator: userId,
                scheduledStartTime: time,
                startTime: time
            }).select()
            .single(),
        userId
    );

    return data.id
}

//join activity
export const joinClock = async (clockId) => {
    const userId = await getUserId();

    try {
        const { data, error } = await supabase
            .from('clockprofile')
            .insert({
                profile_id: userId,
                clock_id: clockId
            })
            .select()
            .single();

        if (error) {
            console.error("Error inserting clock:", error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error in joinClock:", error);
        throw error;
    }
}

export const leaveClock = async (clockId) => {
    const userId = await getUserId();

    await getOrUpdateClocks(
        supabase
            .from('clockprofile')
            .delete()
            .eq('profile_id', userId)
            .eq('clock_id', clockId)
    );
}

//------------------- filters -------------------//
export const getParticipants = (clock, clockProfile) => {
    const participants = clockProfile.filter(cp => cp.clock_id === clock[0].id).map(cp => cp.profile_id);
    return participants;
}

export const getActiveClocks = (clocks) => {
    const filterClocks = clocks.filter(c => c.startTime && !c.stopTime);
    return filterClocks;
}

export const getScheduledClocks = (clocks) => {
    //nog voorbij nooit gestarte momenten wegfilteren.

    const filterClocks = clocks.filter(c => !c.startTime);
    return filterClocks;
}



export const getActiveClockUser = (clocks, userId, clockProfile) => {
    const UserClocksProfile = clockProfile.filter(cp => cp.profile_id === userId);
}

/*
Some functions to get a random free clock
*/
//------------------- get a random clock -------------------//
//get time in correct time zone
export const getTimeNow = () => {
    return new Date(Date.now()).toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })
}

export const getDateNow = () => {
    let date = new Date();
    date = date.toISOString().split('T')[0];
    return date;
}

const timeDifference = (time) => {
    const timeDiff = (getTimeNow() - time)
    return timeDiff;
}

//create an array of all the free clocks
const addFreeClocks = async () => {
    let freeClocks = [];
    let occupiedClocks = [];

    const clocks = await getMuseumClocks();

    clocks.forEach(clock => {
        if (
            clock.startTime && !clock.stopTime
            || timeDifference(clock.startTime) < (100 * 60 * 60)
        ) {
            occupiedClocks.push(clock.clockWallPos);
        }
    });

    for (let i = 1; i <= totalClocks; i++) {
        if (!occupiedClocks.includes(i)) {
            freeClocks.push(i);
        }
    }
    return freeClocks;
}

//get a random clock out of the free clocks
const getRandomClockNumber = async () => {
    const freeClocks = await addFreeClocks();

    const clockId = Math.floor(Math.random() * freeClocks.length);
    const clock = freeClocks[clockId];
    return clock;
}

/*
Some other functions to get the right buttons & clocks
*/
//------------------- get a random clock -------------------//
export const clockLinkedWithUser = (clock, participants, userId) => {
    const clockId = clock.id;

    if (participants) {
        const participant = participants.find(p => p.profile_id === userId && p.clock_id === clockId);
        if (participant) {
            return true;
        }
    } else {
        return false;
    }
}