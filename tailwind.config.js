const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [ './src/**/*.svelte', './src/**/*.html' ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: [ ...defaultTheme.fontFamily.sans, 'Quicksand' ],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      red: colors.rose,
      blue: colors.lightBlue,
      green: colors.emerald,
      gray: colors.blueGray,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
