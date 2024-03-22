/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // dark: {
        //   700: "rgb(16, 16, 20)",
        //   500: "rgb(23, 23, 30)",
        // },
        dark: {
          700: "rgb(17, 19, 29)",
          500: "rgb(22, 26, 37)",
        },
        border: "rgb(35, 38, 54)",
        lightgreen: "rgb(108, 198, 153)",
        lightred: "rgb(192, 73, 102)",

        light: {
          100: "rgb(255, 255, 255)",
          300: "rgb(243, 245, 247)",
        },
        accent: "#205fec",
      },
    },
  },
  plugins: [],
};
