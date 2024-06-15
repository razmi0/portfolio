/** @type {import('tailwindcss').Config} */
import { screens } from "tailwindcss/defaultTheme.js";

// '2xs': '375px' => (min-width: 375px)
// 'xs': '475px' => (min-width: 475px)
// 'sm': '640px' => (min-width: 640px)
// 'md': '768px' => (min-width: 768px)
// 'lg': '1024px' => (min-width: 1024px)
// 'xl': '1280px' => (min-width: 1280px)
// '2xl': '1536px' => (min-width: 1536px)

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
    screens: {
      "2xs": "375px",
      xs: "475px",
      ...screens,
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
