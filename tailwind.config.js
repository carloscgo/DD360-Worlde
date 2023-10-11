/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neutral-500':'#6AAA64',
        'neutral-400':'#929B9F',
      }
    },
  },
  plugins: [],
};
