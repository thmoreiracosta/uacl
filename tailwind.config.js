/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#27423a',
        'primary-dark': '#1a2e29',
        'secondary': '#b7935d',
        'secondary-light': '#d4b98a',
        'accent': '#750814',
        'gold': '#cea464',
        'cream': '#f8f5f0',
      },
      fontFamily: {
        'sans': ['Lato', 'sans-serif'],
        'serif': ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}