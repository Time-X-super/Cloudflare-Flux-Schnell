/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#b3e0ff',
          200: '#80cbff',
          300: '#4db5ff',
          400: '#1a9fff',
          500: '#0088ff',
          600: '#006fd6',
          700: '#0055ad',
          800: '#003c84',
          900: '#00225b',
        },
        secondary: {
          50: '#f0f4ff',
          100: '#d6e0ff',
          200: '#adc1ff',
          300: '#85a3ff',
          400: '#5c84ff',
          500: '#3366ff',
          600: '#254edb',
          700: '#1939b7',
          800: '#0c2593',
          900: '#00146f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #0088ff, 0 0 10px #0088ff, 0 0 15px #0088ff, 0 0 20px #0088ff' },
          '100%': { boxShadow: '0 0 10px #3366ff, 0 0 20px #3366ff, 0 0 30px #3366ff, 0 0 40px #3366ff' },
        },
      },
    },
  },
  plugins: [],
} 