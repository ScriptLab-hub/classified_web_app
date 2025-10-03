-- Create users table
-- Create a table for public user profiles
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username TEXT,
  profile_image_url TEXT,
  role TEXT DEFAULT 'user'
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- This trigger automatically creates a profile for new users.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, profile_image_url)
  VALUES (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'profile_image_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- Create categories table
CREATE TABLE public.categories (
    category_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public categories are viewable by everyone." ON public.categories
  FOR SELECT USING (true);


-- Create locations table
CREATE TABLE public.locations (
    location_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    city VARCHAR(255) NOT NULL UNIQUE,
    country VARCHAR(255) NOT NULL DEFAULT 'Pakistan'
);

ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public locations are viewable by everyone." ON public.locations
  FOR SELECT USING (true);


-- Create ads table
CREATE TABLE public.ads (
    ad_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT, -- Ad ki image ka URL
    status VARCHAR(50) DEFAULT 'active' NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id INT REFERENCES public.categories(category_id) ON DELETE SET NULL,
    location_id INT REFERENCES public.locations(location_id) ON DELETE SET NULL,
    contact_info VARCHAR(50), -- User ka contact number (ya email)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for ads table
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;

-- Policies for ads table
CREATE POLICY "Ads are viewable by everyone." ON public.ads
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create ads." ON public.ads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ads." ON public.ads
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ads." ON public.ads
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for faster lookups
CREATE INDEX idx_ads_category ON public.ads (category_id);
CREATE INDEX idx_ads_user ON public.ads (user_id);