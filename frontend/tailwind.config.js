/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
      extend: {
        colors: {
          primary: {
            50: "#f0f9ff",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
          },
          cacao: {
            50: "#fdf4e7",
            100: "#f7e4c1",
            200: "#f0d097",
            300: "#e8bb6d",
            400: "#e1a74f",
            500: "#d97706",
            600: "#c2620a",
            700: "#a04d08",
            800: "#7f3906",
            900: "#5c2a04",
          },
        },
        fontFamily: {
          sans: ["Inter", "system-ui", "sans-serif"],
        },
      },
    },
    plugins: [],
  }
  