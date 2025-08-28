// app/components/Navbar.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  // { href: "/about-us", label: "About us" },
  { href: "/products", label: "Products" },
  // { href: "/features", label: "Features" },
  // { href: "/contact-us", label: "Contact us" },
];

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-0" aria-label="FitFuel Home">
            <Image src="/logo.svg" alt="FitFuel Logo" width={60} height={60} />
          </Link>

          <div className="hidden lg:flex flex-grow justify-center">
            <div className="flex items-center space-x-8 text-gray-700 font-medium">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-brand-green">
                  {link.label}
                </Link>
              ))}
              <Link href="/cart" className="flex items-center gap-2 hover:text-brand-green">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                </svg>
                Cart
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-brand-green" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
              </svg>
            </button>
            <Link href="/signup" className="text-sm font-medium hover:text-brand-green">
              Login
            </Link>
            <Link href="/signup" className="text-sm font-medium text-white bg-brand-green px-4 py-2 rounded-lg">
              Sign Up
            </Link>

            <Link href="/checkout" className="text-sm font-medium bg-red-500 text-white p-2 rounded-lg">
              (Test) Checkout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

