const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      gray: colors.gray,
      black: {
        darkest: '#16161C',
        dark: '#1A1C23',
        DEFAULT: '#1A1C23',
      },
      white: {
        DEFAULT: '#FcFFFd',
      },
      cream: {
        lighter: '#FDF0ED', //#1C1E26
        light: '#FADAD1', //#232530
        dark: '#F9CEC3', // #2E303E
        darker: '#F9CBBE', // #6C6F93
        DEFAULT: '#FADAD1',
      },
      red: {
        light: '#E84A72', //#E95379
        dark: '#F43E5C', // #F43E5C
        darker: '#E73665', // #E9436F
        DEFAULT: '#E84A72',
      },
      green: {
        light: '#07DA8C', //#09F7A0
        dark: '#1EB980', //#1EAEAE
        DEFAULT: '#07DA8C',
      },
      teal: {
        DEFAULT: '#1EAEAE', //#21BFC2
      },
      brown: {
        DEFAULT: '#AF5427', //#FAB28E
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Lora', ...defaultTheme.fontFamily.serif],
      },
      transitionProperty: {
        margin: 'margin',
        spacing: 'margin, padding',
      },
    },
  },
};
