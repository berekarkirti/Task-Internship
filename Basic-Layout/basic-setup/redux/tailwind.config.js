/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // Ensure class-based dark mode
  theme: {
    extend: {
      colors: {
        light: {
          background: "#ffffff",
          text: "#1a202c",
          accent: "#38b2ac",
        },
        dark: {
          background: "#1a202c",
          text: "#ffffff",
          accent: "#4fd1c5",
        },
      },
    },
  },
  plugins: [],
};
