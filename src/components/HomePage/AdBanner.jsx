import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

const AdBanner = () => {
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    const fetchPromo = async () => {
      // Fetch all active promotions for the footer
      const { data, error } = await supabase
        .from('sponsored_ads')
        .select('*')
        .eq('is_active', true)
        .eq('placement', 'footer');

      if (error) {
        console.error('Error fetching footer promo:', error);
      } else if (data && data.length > 0) {
        // Pick a random one if there are multiple
        const randomPromo = data[Math.floor(Math.random() * data.length)];
        setPromo(randomPromo);
      }
    };

    fetchPromo();
  }, []);

  if (!promo) return null;

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <a href={promo.cta_action} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
          <div
            className="relative w-full h-40 md:h-48 bg-cover bg-center rounded-lg overflow-hidden"
            style={{ backgroundImage: `url(${promo.image_url})` }}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{promo.title}</h2>
                <p className="text-sm md:text-base">{promo.description}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default AdBanner;