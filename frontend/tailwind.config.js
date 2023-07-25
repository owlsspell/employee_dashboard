/** @type {import('tailwindcss').Config} */

const formKitTailwind = require('@formkit/themes/tailwindcss');

export default {
  content: ['./src/**/*.{vue,js,ts}', './tailwind-theme.js',],
  // theme: {
  //   extend: {},
  // },
  themes: [
    {
      themes: ["light", "dark", "coffee"],
    }],
  plugins: [require("daisyui"), formKitTailwind],
  daisyui: {
    themes: true,
  }
}

