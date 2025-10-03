import { supabase } from './supabase';

export const signUp = async ({ email, password, username }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });
  return { data, error };
};

export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) return { user: null, error: sessionError };
  if (!session) return { user: null, error: null };

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  return { user, error: userError };
};

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select();

  return { data, error };
};

export const uploadProfileImage = async (userId, file) => {
  const filePath = `public/profiles/${userId}/${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from('user_profiles')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) return { publicUrl: null, error: uploadError };

  const { data: { publicUrl } } = supabase.storage.from('user_profiles').getPublicUrl(filePath);
  return { publicUrl, error: null };
};