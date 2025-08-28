import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Contact Form */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
          <p className="text-sm mb-4">Send us a message</p>
          <div className="space-y-3">
            <input type="text" placeholder="Full name" className="w-full bg-gray-400 text-gray-800 placeholder-gray-600 rounded-md p-3 text-sm" />
            <input type="email" placeholder="Your Email" className="w-full bg-gray-400 text-gray-800 placeholder-gray-600 rounded-md p-3 text-sm" />
            <textarea placeholder="Your message" rows={4} className="w-full bg-gray-400 text-gray-800 placeholder-gray-600 rounded-md p-3 text-sm"></textarea>
            <button type="submit" className="bg-gray-800 text-white font-bold py-2 px-6 rounded-lg hover:opacity-90">
              Submit
            </button>
          </div>
        </div>

        {/* Site Map */}
        <div className="flex justify-center">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Site map</h3>
            <p className="text-sm mb-4">2024 our page</p>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="hover:text-white">_Home</a></li>
              {/* <li><a href="/about" className="hover:text-white">_About us</a></li> */}
              <li><a href="/products" className="hover:text-white">_Products</a></li>
              {/* <li><a href="/features" className="hover:text-white">_Features</a></li> */}
              {/* <li><a href="/contact" className="hover:text-white">_Contact Us</a></li> */}
            </ul>
          </div>
        </div>

        {/* Logo & Contact Info */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">

            <Link href="/" className="mb-6">
              <Image src="/logo.svg" alt="FitFuel Logo" width={80} height={80} />
              
            </Link>
          
          <p className="text-sm mb-2">📞 (+855) 36 603 369</p>
          <p className="text-sm">✉️ thaing.parinha24@gmail.com</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 py-4">
        <p className="text-center text-xs text-gray-400">
          Copyright 2025 All Right Reserves Company Name
        </p>
      </div>
    </footer>
  );
};

export default Footer;
