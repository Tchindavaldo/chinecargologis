/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#5a0b0b', // Deep Red
          primary: '#8b0000', // Dark Red
          secondary: '#d32f2f', // Red
          accent: '#ffb300', // Gold/Amber
          light: '#fff8e1', // Light yellow/cream
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
