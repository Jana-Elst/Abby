import { supabase } from "../supabaseClient";
/* eslint-disable */
// Handful of helper functions to be called from route loaders and actions
export async function getUserClocks(userId){
    try{
        let query = supabase.from('profiles').select('clocks (id, name, description, startTime,)').eq('id', userId);
        let { data, error } = await query;

        return data[0].clocks;
    }catch(error){
        console.error("Error fetching user clocks:", error);
        throw error;
    }
}

export async function getMuseumClocks(){
    try{
        let query = supabase.from('clocks').select('id, name, description, startTime, clockWallPos').not('clockWallPos', 'is', null);
        let { data, error } = await query;
        
        return data
    }catch(error){
        console.error("Error fetching user clocks:", error);
        throw error;
    }
}