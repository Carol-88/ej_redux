/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-yellow": "#eee989",
        "light-green": "#a3eea7",
        "light-blue": "#00ccf7",
        "light-purple": "#ad8be6",
        "light-pink": "#ee89c0",
      },
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [],
};
