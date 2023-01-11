'use strict';
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [`./app/**/*.{html,js,ts,hbs}`],
  theme: {
    themeVariants: ['dark'],
  },
};
