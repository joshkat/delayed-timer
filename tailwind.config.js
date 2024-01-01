/** @type {import('tailwindcss').Config} */
export default {
  content: ["./input.css", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["black", "light"],
  },
};
