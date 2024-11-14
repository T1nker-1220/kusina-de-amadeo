
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
        theme: {
          peach: '#FDA485',
          wine: '#973C47',
          red: '#C84242',
          navy: '#242E49',
          slate: '#94A3B8',
          dark: '#171923',
        },
        primary: '#FF7E33',
        secondary: '#FFB088',
      },
      screens: {
        'mobile-s': '375px',
        'xs': '480px',
      },
    },
  },
  plugins: [],
}