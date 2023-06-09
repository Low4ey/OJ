module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        secone: ['Secular One','sans-serif']
      },
      colors: {
        'custom-gray': {
          DEFAULT: '#4C3A51',
        },
        'custom-blue': {
          DEFAULT: '#774360',
        },
        'custom-dark-blue': {
          DEFAULT: '#B25068',
        },
        'custom-orange': {
          DEFAULT: '#E7AB79',
        },
      },
    },
  },
  plugins: [],
};
 