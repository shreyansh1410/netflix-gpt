/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textShadow: {
        black: "2px 2px 4px rgba(0, 0, 0, 1)", // Custom black shadow
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
