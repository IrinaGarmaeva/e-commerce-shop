/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        "background": "rgb(255, 255, 255)",
        "bg-opacity" : "rgba(58, 63, 68, 0.7)",
        "white": "#fff",
        "text-main": "#333333",
        "middle-gray": "#555555",
        "light-gray": "#b6b5b5",
        "pink": "#FF005B",
        "gray": "#999999",
        "orange": "#D82700",
        "red": "#fe5252"
      },
      screens: {
        "wide": "1440px",
        "350px" : "350px",
      }
    },
  },
  plugins: [],
}

