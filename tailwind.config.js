/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide"), require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['valentine', 'autumn', 'retro', 'coffee'],
  },
}