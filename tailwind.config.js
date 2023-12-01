/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      backgroundColor: {
        "main-100": "#33B5E5",
        "main-200": "#338BE5",
        "main-300": "#CED9D9",
        "overlay-30": "rgba(0,0,0,0.3)",
      },
      textColor: {
        "main-100": "#33B5E5",
        "main-200": "#338BE5",
      },
      borderRadius: {
        blur: "3px solid filter(blur(10px))", // Điều chỉnh mức độ nhòe ở đây
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        Montserrat: "Montserrat",
      },
    },
    screens: {
      1600: "1600px",
    },
  },
  plugins: [
    require("tailwindcss-filters"),
    // Các plugin khác...
  ],
};
