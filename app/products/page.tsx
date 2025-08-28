import React from 'react';
import ProductCard from '../../components/ProductCard';

// THIS IS THE UPDATED LIST WITH YOUR CORRECT FILENAMES
const productsData = [
  { name: 'FitFuel Whey Pro', description: 'For muscle growth & recovery.', price: 49.99, imageUrl: '/images/fitfuel_wheypro.png' },
  { name: 'FitFuel Ignite', description: 'Pre-workout for energy & focus.', price: 39.99, imageUrl: '/images/fitfuel_ignite.png' },
  { name: 'FitFuel Whey Pro', description: 'Your complete daily vitamins.', price: 19.99, imageUrl: '/images/whey_pro.png' }, // You have two whey pros, which is fine!
  { name: 'FitFuel Crea-Boost', description: 'Pure creatine for strength.', price: 29.99, imageUrl: '/images/fitfuel_boost.png' },
  { name: 'FitFuel Omega+', description: 'Fish oil for heart & brain health.', price: 24.99, imageUrl: '/images/fitfuel_omega.png' },
  { name: 'FitFuel Energy Gummies', description: 'A tasty boost of B12 vitamins.', price: 51.99, imageUrl: '/images/gummy.png' }, // Updated price from your figma
  { name: 'FitFuel Plant Power', description: '100% plant-based protein.', price: 54.99, imageUrl: '/images/power.png' },
  { name: 'FitFuel Super Greens', description: 'Your daily serving of greens.', price: 44.99, imageUrl: '/images/green.png' },
  { name: 'FitFuel Gummy', description: 'Saffron Extract & Vitamin D.', price: 19.99, imageUrl: '/images/gummyy.png' }, // Updated the last product based on your figma
];

const ProductsPage = () => {
  return (
    <div className="bg-gray-50"> {/* Added a light grey background to match Figma */}
      <div className="max-w-screen-xl mx-auto py-16 px-4">
        
        {/* Page Title from your Figma Design */}
        <h1 className="text-4xl font-extrabold text-brand-dark mb-12 text-center">
          "Explore Our Supplements"
        </h1>

        {/* The Grid for the Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {productsData.map((product) => (
            <ProductCard 
              key={product.name + product.price} // Added price to key to make it more unique
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;