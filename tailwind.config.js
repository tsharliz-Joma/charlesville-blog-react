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
        noir: '#0b0d10',
        smoke: '#11151b',
        iron: '#1a2028',
        slate: '#2a323d',
        steel: '#6b7280',
        fog: '#c7cbd1',
        haze: '#e3e6ea',
        neon: '#7de3e1',
        pulse: '#f08aa7'
      },
      boxShadow: {
        glow: '0 0 25px rgba(125, 227, 225, 0.15)',
        ember: '0 0 30px rgba(240, 138, 167, 0.12)'
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
