/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        yellow: {
          700: "#FEFD00",
        },
      },
      fontFamily: {
        'chakra-petch': ['"Chakra Petch"', 'sans-serif'],
        'montserrat': ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
