/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neutral: {
          900: '#3C3E44',    // Darkest
          800: '#565C64',    // Dark
          700: '#848382',    // Medium
          200: '#EDE6DE',    // Light
          100: '#A5ABB1',    // Lightest
        },
        primary: {
          50: '#F8F9FA',
          100: '#EDE6DE',
          200: '#A5ABB1',
          300: '#848382',
          400: '#565C64',
          500: '#3C3E44',
          600: '#3C3E44',
          700: '#2D3033',
          800: '#1E2023',
          900: '#0F1012',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}