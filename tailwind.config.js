// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: "rgba(5,146,18,0.5)",
        darkGreen: "#059212",
        yellow: "#F3FF90",
        lightGreen: "#9BEC00",
        darkerGreen: "#094505",
        greenLowKey: "#157A6E",
      },
    },
  },
  plugins: [],
};
