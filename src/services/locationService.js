import { supabase } from './supabase';

export const getLocations = async () => {
  const { data, error } = await supabase.from('locations').select('*');
  return { data, error };
};