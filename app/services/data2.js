import { supabase } from "../supabaseClient";

/* eslint-disable */
// Handful of helper functions to be called from route loaders and actions
//get all the clocks from a user
export async function getUserClocks(userId) {
    try {
        let query = supabase.from('profiles').select('clocks (id, name, description, startTime)').eq('id', userId);
        let { data, error } = await query;

        return data[0].clocks;
    } catch (error) {
        console.error("Error fetching user clocks:", error);
        throw error;
    }
}

//get all the clocks
export async function getMuseumClocks() {
    try {
        let query = supabase
            .from('clocks')
            .select('id, name, description, startTime, clockWallPos').not('clockWallPos', 'is', null);
        let { data, error } = await query;

        return data
    } catch (error) {
        console.error("Error fetching museum clocks:", error);
        throw error;
    }
}

//just get one clock
//add the clock id
export async function getClock(id) {
    try {
        let query = supabase
            .from('clocks')
            .select('*')
            .eq('id', id);

        let { data, error } = await query;
        console.log(data);
        return data
    } catch (error) {
        console.error("Error fetching museum clocks:", error);
        throw error;
    }
}


export async function addClock(userId, name, description, scheduledStartTime, prive, location, flowForm) {
    console.log(scheduledStartTime);
    console.log(new Date(scheduledStartTime).toISOString());
    console.log('privé', prive);
    try {
        let query = supabase.from('clocks')
            .insert({
                name: name,
                description: description,
                scheduledStartTime: new Date(scheduledStartTime).toISOString(),
                private: prive,
                location: location
            }).select().single();
        let { data, error } = await query;
        let joinQuery = supabase.from('clockprofile').insert({ profile_id: userId, clock_id: data.id });
        await joinQuery;

        return data;
    } catch (error) {
        console.error("Error inserting clock:", error);
        throw error;
    }
}

/*------- filter the clocks -------*/
export const getParticipants = (clock, clockProfile) => {
    const participants = clockProfile.filter(cp => cp.clock_id === clock.id);
    return participants;
}

/*------- get a free clock -------*/
const totalClocks = 3;
const clocksPerArduino = 3;
const occupiedClocks = [];
let freeClocks = [];

//make an array of all the free clocks
export const addFreeClocks = async () => {
    const now = Date.now();

    const clocks = await getMuseumClocks();
    console.log(clocks);

    clocks.forEach(clock => {
        if (
            clock.startTime && !clock.stopTime
            || now - clock.startTime < (100 * 60 * 60)
        ) {
            occupiedClocks.push(clock.clockWallPos);
        }
    });

    for (let i = 1; i <= totalClocks; i++) {
        if (!occupiedClocks.includes(i)) {
            freeClocks.push(i);
        }
    }
    console.log(freeClocks);
}

//get a random clock out of the free clocks
export const getRandomClockNumber = async () => {
    await addFreeClocks();
    const clockId = Math.floor(Math.random() * freeClocks.length);
    const clock = freeClocks[clockId];
    console.log(clock);
    return clock;
}

//create a new clock (now)
export const createNewClock = async (userId) => {
    const clockNumber = await getRandomClockNumber();
    const now = Date.now();
    const nowISO = new Date(now).toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })
    console.log('create new thing in DB', clockNumber, userId, nowISO);

    try {
        let query = supabase.from('clocks')
            .insert({
                clockWallPos: clockNumber,
                creator: userId,
                scheduledStartTime: nowISO,
                startTime: nowISO
            })
            .select()
            .single();
        let { data, error } = await query;
        console.log('data', data);
        let joinQuery = supabase.from('clockprofile')
            .insert({ profile_id: userId, clock_id: data.id });
        await joinQuery;

        console.log(data);
        return data;
    } catch (error) {
        console.error("Error inserting clock:", error);
        throw error;
    }
}

//remove wallPosition
export const removeWallPos = async (clockId) => {
    console.log(clockId);
    try {
        let query = supabase.from('clocks')
            .update({
                clockWallPos: 'clockNumber',
                startTime: ''
            })
            .eq('id', clockId);

        return data;
    } catch (error) {
        console.error("Error inserting clock:", error);
        throw error;
    }
}

