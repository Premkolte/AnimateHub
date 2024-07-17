/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gagalin: ['Gagalin', 'sans-serif'],
      },
      backgroundImage: {
        'text-gradient': 'linear-gradient(45deg, #ee22b5, #ee22b5)',
      },
    },
  },
  plugins: [],
};
