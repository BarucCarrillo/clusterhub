const { color } = require("@rneui/base");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./views/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      colors:{
        header:"#95D7CA",
        secondary:"#317B9B",
        back:"#F5F5F5"
      }
    },
  },
  plugins: [],
};