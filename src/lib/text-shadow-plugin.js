// A simple Tailwind CSS plugin to add text shadow utilities
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities }) {
  const newUtilities = {
    '.text-shadow-sm': {
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
    },
    '.text-shadow': {
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
    },
    '.text-shadow-md': {
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.6)'
    },
    '.text-shadow-lg': {
      textShadow: '0 8px 16px rgba(0, 0, 0, 0.7)'
    },
    '.text-shadow-none': {
      textShadow: 'none'
    },
  };

  addUtilities(newUtilities);
});
