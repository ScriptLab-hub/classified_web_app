import React from 'react';
import Hero from '../Hero/Hero';
import Footer from '../Footer/Footer';
import CategoryCarousel from '../CategoryCarousel/CategoryCarousel';
import GeneralItemsSection from '../Categories/GeneralItemsSection';
import AdBanner from '../HomePage/AdBanner';

const HomePage = () => {
  return (
    <div className="bg-gray-100 pt-24 pb-8">
      <Hero />

      <div className="container mx-auto px-4">
        <div className="space-y-12 mt-12">
          <CategoryCarousel categoryId={1} categoryName="Latest Cars" isReverse={true} />
          <CategoryCarousel categoryId={2} categoryName="Latest Computers" isReverse={true} />
          <CategoryCarousel categoryId={3} categoryName="Latest Properties" isReverse={true} />
        </div>
        <GeneralItemsSection />
      </div>
      <AdBanner />
      <Footer />
    </div>
  );
};

export default HomePage;