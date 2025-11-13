/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          dark: '#075e54',
          green: '#25d366',
          light: '#dcf8c6',
          bg: '#e5ddd5',
        }
      }
    },
  },
  plugins: [],
}
