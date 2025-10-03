import { supabase } from './supabase';

export const getCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*');
  return { data, error };
};