/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  //purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#0D1F2D',
        secondary: '#8C8B8B',
        text_box: '#8BA7BC',

      },
      fontFamily: {
        customFont: ['"Chakra_Petch"'],
      },
    },
  },
  plugins: [],
}