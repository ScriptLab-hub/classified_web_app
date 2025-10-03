import { createClient } from '@supabase/supabase-js';

// Environment variables se Supabase URL aur anon key lein
// Aapko .env file mein inki values deni hongi
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase client banayein
export const supabase = createClient(supabaseUrl, supabaseKey);