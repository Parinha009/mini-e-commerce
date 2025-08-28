import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    // We use a light grey background to separate this section from the one above it.
    <section className="bg-gray-50 py-20">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* The two-column layout using Flexbox */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">

          {/* Left Column: Image */}
          <div className="md:w-5/12">
            {/* 
              ACTION: You need to find an image for this section.
              A simple supplement bottle will work perfectly.
              - Export it from Figma or find one online.
              - Name it 'about-image.png'
              - Place it in your 'public/images' folder.
            */}
            <Image 
              src="/images/aboutus.png" 
              alt="Supplement Bottle" 
              width={400} 
              height={400} 
              className="rounded-lg shadow-xl"
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="md:w-7/12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              About Us
            </h2>
            <p className="mt-4 text-lg text-gray-700 font-semibold">
              Shop our best-selling workout supplements now.
            </p>
            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
            </p>
            {/* This is a secondary button, styled differently from the Hero button. */}
            <button className="mt-8 bg-brand-dark text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors">
              Read More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;