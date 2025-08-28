/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#16A34A', 
        'brand-dark': '#1F2937',  
        'brand-lime': '#4BF024', // FIX: Added your new button color here
      }
    },
  },
  plugins: [],
}


