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
          dark: '#783FE0',
        },
        secondary: {
          dark: '#1A1A1A',
        },
      },
    },
  },
  plugins: [],
}

