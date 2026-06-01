/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06b6d4",
        dark: "#0a0a0a",
        glass: "rgba(255,255,255,0.05)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 30px rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
  // Hindari generate utility yang tidak perlu
  corePlugins: {
    preflight: true,
  },
};
