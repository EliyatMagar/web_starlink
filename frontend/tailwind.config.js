/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#047857",   // Example: green-700
        secondary: "#FACC15", // Example: yellow-400
      },
    },
  },
  plugins: [],
};
 