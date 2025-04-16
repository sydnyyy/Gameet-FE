const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: Object.fromEntries(Array.from({ length: 5001 }, (_, i) => [i.toString(), `${i}px`])),
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.flex-center': {
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
        },
      });
    }),
  ],
};
