import { supabase } from "../supabaseClient";
/* eslint-disable */
// Handful of helper functions to be called from route loaders and actions
export async function getUserClocks(userId){
    try{
        let query = supabase.from('profiles').select('clocks (id, name, description)').eq('id', userId);
        let { data, error } = await query;

        return data[0].clocks;
    }catch(error){
        console.error("Error fetching user clocks:", error);
        throw error;
    }
}