import React from 'react';
import PromoCarousel from './PromoCarousel';

const Hero = () => {
  return (
    <section className="relative h-[400px] bg-cover bg-center">
      <PromoCarousel />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
          Buy & Sell Anything in Pakistan
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-6">
          Millions of ads from cars to jobs
        </p>
      </div>
    </section>
  );
};

export default Hero;