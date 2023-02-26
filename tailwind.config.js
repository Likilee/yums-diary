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
      spacing: {
        safebottom: 'env(safe-area-inset-bottom)',
        safetop: 'env(safe-area-inset-top)',
        safeleft: 'env(safe-area-inset-left)',
        saferight: 'env(safe-area-inset-right)',
      },
      zIndex: {
        navtop: 3,
        content: 'auto',
        navbottom: 2,
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
