/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}", // <--- Para tu carpeta components
    "./*.{js,ts,jsx,tsx}", // <--- Para App.tsx e index.tsx en la raíz
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
