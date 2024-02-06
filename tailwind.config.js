/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        myShadow1: "4.1px -5px 0 0 rgb(247 247 247)",
        myShadow2: "-4.1px -5px 0 0 rgb(247 247 247)"
      }
    },
  },
  plugins: [],
};
