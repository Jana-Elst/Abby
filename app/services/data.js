import { supabase } from "../supabaseClient";
import { totalClocks, clocksPerArduino } from "./museumData";

/*
Handful of helper functions to be called from route loaders and actions
and insert or delete things from the database
*/

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
export const getMuseumClocks = async () => {
    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select('id, name, description, startTime, clockWallPos')
            .not('clockWallPos', 'is', null)
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
    console.log(id);
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

//------------------- Add a row -------------------//
const addRow = async (query, userId) => {
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
//!change the name!
export const addScheduledClock = async (userId, name, description, scheduledStartTime, prive, location) => {
    console.log(userId);
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

//add clock for now physical
export const addPhysicalClock = async (userId) => {
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

    console.log(data.id);
    return data.id
}

/*
Some functions to get a random free clock
*/
//------------------- get a random clock -------------------//
//get time in correct time zone
export const getTimeNow = () => {
    return new Date(Date.now()).toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })
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
    console.log(clocks);

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
    console.log(freeClocks);
    return freeClocks;
}

//get a random clock out of the free clocks
const getRandomClockNumber = async () => {
    const freeClocks = await addFreeClocks();

    const clockId = Math.floor(Math.random() * freeClocks.length);
    const clock = freeClocks[clockId];
    console.log(clock);
    return clock;
}