const withAnimations = require('animated-tailwindcss')

module.exports = withAnimations({
  enabled: true,
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        900: '#202225',
        800: '#2f3136',
        700: '#36393f',
        600: '#4f545c',
        400: '#d4d7dc',
        300: '#e3e5e8',
        200: '#ebedef',
        100: '#f2f3f5'
      }
    },
    spacing: {
      88: '22rem'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
})
