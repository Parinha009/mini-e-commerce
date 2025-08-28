import React from 'react';
import Image from 'next/image';

const Sponsors = () => {
  return (
    // We use a plain white background for this section.
    <section className="bg-white py-20">
      <div className="max-w-screen-xl mx-auto px-4 text-center">

        <h2 className="text-3xl font-bold text-brand-dark mb-4">
          Trusted By The Best
        </h2>
        <p className="text-gray-600 mb-12">
          Shop our best-selling workout supplements now.
        </p>

        {/* Flex container to hold the logos and space them out */}
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
          
          {/* 
            ACTION: You need your sponsor logos for this section.
            - Make sure they are exported as PNG or SVG.
            - Place them all in your 'public/images' folder.
          */}
          
          <Image src="/images/myprotein-logo.png" alt="Myprotein Logo" width={140} height={50} className="opacity-60" />
          <Image src="/images/optimum-nutrition-logo.png" alt="Optimum Nutrition Logo" width={140} height={50} className="opacity-60" />
          <Image src="/images/gymshark-logo.png" alt="Gymshark Logo" width={140} height={50} className="opacity-60" />
          <Image src="/images/bodybuilding-logo.png" alt="Bodybuilding.com Logo" width={140} height={50} className="opacity-60" />
          
        
        </div>

      </div>
    </section>
  );
};

export default Sponsors;