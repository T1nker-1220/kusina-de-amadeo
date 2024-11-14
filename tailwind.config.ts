/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#181a2f',
        'navy': '#242e49',
        'slate': '#37415c',
        'peach': '#fda481',
        'crimson': '#b4182d',
        'burgundy': '#54162b',
        primary: '#ff6b6b', // or any color of your choice
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'mobile-s': '320px',
        'mobile-m': '375px',
        'xs': '480px',
      },
    },
  },
  plugins: [],
};