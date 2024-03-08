/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: "480px",
        ms: "640px",
        md: "768px",
        lg: "976px",
        xxl: { raw: "(min-width: 1440px)" },
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sefer: ["Sefer", "sans-serif"],
      },
    },
  },
  plugins: [],
};
