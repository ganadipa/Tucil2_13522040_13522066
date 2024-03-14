/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        biru1: "#53ADF0",
        biru2: "#3982C8",
        putih: "#FFFFFF",
        hijau2: "#4FAE32",
        hijau1: "#78C93C",
        hijaua: "#45B622",
        hitam: "#292929",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
