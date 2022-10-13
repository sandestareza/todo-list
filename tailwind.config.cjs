/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors : [
        {
          primary : '#16ABF8'
        }
      ]
    },
  },
  plugins: [],
}
