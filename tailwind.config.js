/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "midnight-abyss": "#06121D",
        "black-pearl": "#17242A",
        "bice-blue": "#286FB4",
        "bice-blue-dark": "#1D5588",
        "blizzard-blue": "#74B9D8",
        "alice-blue": "#E2F0F9",
        "ice-blue": "#F6FCFF",
      },
      backgroundImage: {
        "main-dark-gradient": "linear-gradient(to bottom, #030913, #23566C, #040D17)",
      },
      screens: {
        "mobile": { raw: "(max-width: 768px)" },
        "tablet": { raw: "(min-width: 768px) and (max-width: 1200px)" },
        '1100px': '1100px',
        'lg': { raw: "(min-width: 1200px) and (max-width: 1440px)" },
        'xl':{ raw: "(min-width: 1440px) and (max-width: 1920px)" },
        '2xl': { raw: "(min-width: 1920)" },
      }
    },
  },
  plugins: [],
};
