export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  fontFamily: {
    primary: ["Montserrat", "sans-serif"],
  },
  extend: {
    colors: {
      light: "#ffffff",
      dark: "#6b605f",
      primary: "#d5722e",
      secondary: "#000000",
    },
  },
  plugins: [require("daisyui")],
}

