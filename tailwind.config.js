/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8efff',
          100: '#c2d4ff',
          200: '#9ab9ff',
          300: '#739eff',
          400: '#4c83ff',
          500: '#336ae6',
          600: '#2651b4',
          700: '#193881',
          800: '#0c1f4f',
          900: '#02061d'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
