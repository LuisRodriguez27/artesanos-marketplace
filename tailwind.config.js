/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f8f7',
          100: '#dff0eb',
          200: '#b9e1d6',
          300: '#8bcebf',
          400: '#5bba9f',
          500: '#3ea27f',
          600: '#308469',
          700: '#286854',
          800: '#235345',
          900: '#20453a',
          950: '#0f2c25',
        },
        secondary: {
          50: '#fcf5ef',
          100: '#f7e8d6',
          200: '#efcead',
          300: '#e5ae7b',
          400: '#db8e4e',
          500: '#d27235',
          600: '#c25728',
          700: '#a03f23',
          800: '#873525',
          900: '#6b2f25',
          950: '#3a160f',
        },
      },
    },
  },
  plugins: [],
}