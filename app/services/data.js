import { supabase } from "../supabaseClient";

/* eslint-disable */
// Handful of helper functions to be called from route loaders and actions
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

export async function getMuseumClocks() {
    try {
        let query = supabase.from('clocks').select('id, name, description, startTime, clockWallPos').not('clockWallPos', 'is', null);
        let { data, error } = await query;

        return data
    } catch (error) {
        console.error("Error fetching museum clocks:", error);
        throw error;
    }
}


export async function addClock(userId, activity, description) {
    try {
        let query = supabase.from('clocks').insert({ name: activity, description: description }).select().single();
        let { data, error } = await query;
        let joinQuery = supabase.from('clockprofile').insert({ profile_id: userId, clock_id: data.id });
        await joinQuery;

        return data;
    } catch (error) {
        console.error("Error inserting clock:", error);
        throw error;
    }
}

