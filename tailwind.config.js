/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        bogoss: {
          200: "#F2F1FF",
          300: "#7670E6",
          350: "#2B2B82", // "accent"
          400: "#4F46E5",
          500: "#312e81",
          600: "#17153E",
          700: "#0E0C25",
        },
        belgoss: {
          500: "#ff6700",
        },
      },
    },
  },
};
