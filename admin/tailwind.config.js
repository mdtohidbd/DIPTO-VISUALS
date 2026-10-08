/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        adminBg: "#0f172a", // Dark slate background
        adminSidebar: "#1e293b", // Slate sidebar
        adminCard: "#1e293b", // Slate card background
        adminText: "#f8fafc",
      }
    },
  },
  plugins: [],
}
