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


export async function addClock(userId, name, description, scheduledStartTime, prive, location) {
    try {
        let query = supabase.from('clocks')
        .insert({
            name: name,
            description: description,
            scheduledStartTime: scheduledStartTime,
            private: prive
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

