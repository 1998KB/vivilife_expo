// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: "rgba(9, 69, 5, .5)",
        customGreenTab: "rgba(9, 69, 5, .3)",
        darkGreen: "#059212",
        yellow: "#F3FF90",
        lightGreen: "#9BEC00",
        darkerGreen: "#094505",
        greenLowKey: "#157A6E",
      },
      fontFamily: {
        sans: ["Apfel", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
