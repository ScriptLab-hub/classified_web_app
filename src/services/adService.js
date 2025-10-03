import { supabase } from './supabase';

export const getAds = async (filters = {}) => {
  let query = supabase.from('ads').select(`
    *,
    profiles ( username ),
    locations ( city )
  `);

  if (filters.categoryId) {
    query = query.eq('category_id', filters.categoryId);
  }

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
};

export const getAdById = async (adId) => {
  const { data, error } = await supabase
    .from('ads')
    .select(`
      *,
      profiles ( username, profile_image_url ),
      categories ( name ),
      locations ( city, country )
    `)
    .eq('ad_id', adId)
    .single();

  return { data, error };
};

export const createAd = async (adData) => {
  const { data, error } = await supabase.from('ads').insert([adData]).select();
  return { data, error };
};

export const uploadAdImage = async (userId, file) => {
  const filePath = `public/ads/${userId}/${Date.now()}_${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from('ads-pictures')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) return { publicUrl: null, error: uploadError };

  const { data: { publicUrl } } = supabase.storage.from('ads-pictures').getPublicUrl(filePath);
  return { publicUrl, error: null };
};