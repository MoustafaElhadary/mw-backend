const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'hero-pattern': "url('/6.jpg')",
      }),
      colors: {
        'light-blue': colors.sky,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
        orange: '#F15A24',
        navy: '#1B1464',
        'blue-gray': colors.blueGray,
      },
      fontFamily: {
        logo: ['Poppins'],
        title: ['old-money']
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      borderColor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
