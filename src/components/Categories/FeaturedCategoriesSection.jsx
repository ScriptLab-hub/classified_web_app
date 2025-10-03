import React from 'react';
import CategoryAdCarousel from '../Hero/CategoryAdCarousel';

const FeaturedCategoriesSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Categories</h1>
        <div className="space-y-12">
          <CategoryAdCarousel categoryId={1} categoryName="Cars" isReverse={false} />
          <CategoryAdCarousel categoryId={2} categoryName="Computers" isReverse={true} />
          <CategoryAdCarousel categoryId={3} categoryName="Property" isReverse={false} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategoriesSection;