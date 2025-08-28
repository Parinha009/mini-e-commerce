import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    // Main container for the hero section
    <section className="bg-white py-20">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Flex container to hold the two columns */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Left Column: Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight">
              FitFuel: The Power Behind Your Progress.
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Shop our best-selling workout supplements now.
            </p>
            {/* The main call-to-action button */}
            <Link href="/products" className="mt-8 inline-block bg-brand-green text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition-all">
              Shop Now
            </Link>
          </div>

          {/* Right Column: Image */}
          <div className="md:w-1/2 mt-10 md:mt-0">
            {/* Remember to put this image in your /public/images folder */}
            <Image src="/images/hero-image.png" alt="Supplements" width={600} height={400} className="rounded-lg" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

