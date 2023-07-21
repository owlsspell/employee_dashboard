/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts}'],
  // theme: {
  //   extend: {},
  // },
  themes: [
    {
      themes: ["light", "dark", "coffee"],
    }],
  plugins: [require("daisyui")],
  daisyui: {
    themes: true,
  }
}

