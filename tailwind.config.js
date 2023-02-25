const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-leeseoyun)', ...fontFamily.sans],
        leeseoyun: 'var(--font-leeseoyun)',
        simkyungha: 'var(--font-simkyungha)',
      },
    },
  },

  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'valentine',
      'autumn',
      'retro',
      'coffee',
      'cupcake',
      'lemonade',
      'garden',
      'aqua',
      'lofi',
      'forest',
      'cyberpunk',
      'synthwave',
    ],
  },
}
