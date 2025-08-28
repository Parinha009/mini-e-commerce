import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCard = ({ name, description, price, imageUrl }: ProductCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
      
      <div className="relative w-full">
        {/* Heart Icon */}
        <button className="absolute top-0 right-0 p-2 text-gray-400 hover:text-red-500 transition-colors z-10" aria-label="Add to favorites">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>

        {/* Product Image */}
        <Link href="#"> 
          <div className="relative w-48 h-48 mx-auto mb-4">
            <Image src={imageUrl} alt={name} fill className="object-contain" />
          </div>
        </Link>
      </div>

      {/* Product Details */}
      {/* FIX: Text is now black */}
      <h3 className="text-lg font-bold text-black">{name}</h3>
      <p className="text-sm text-black my-2 min-h-[40px]">{description}</p>
      
      {/* Price */}
      {/* FIX: Text is now black */}
      <p className="text-2xl font-extrabold text-black mb-4">${price.toFixed(2)}</p>
      
      {/* Add to Cart Button */}
      {/* FIX: Button is added back with your new brand-lime color */}
      <button className="bg-brand-lime text-black font-bold py-2 px-8 rounded-full hover:opacity-90 transition-opacity w-full">
        Add to Cart
      </button>

    </div>
  );
};

export default ProductCard;