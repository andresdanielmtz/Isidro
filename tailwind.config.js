/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'blackground' : '#213547',
    },
    extend: {
      spacing: {
        '5px': '5px',
      },
    },
  },
  plugins: [],
};
