/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#5949e9",
        "background-light": "#f6f6f8",
        "background-dark": "#131121",
        "foreground-light": "#131121",
        "foreground-dark": "#f6f6f8",
        "card-light": "#ffffff",
        "card-dark": "#1f1c2f",
        "input-light": "#ffffff",
        "input-dark": "#2a273f",
        "input-border-light": "#e5e7eb",
        "input-border-dark": "#4a4a6a",
        "placeholder-light": "#6b7280",
        "placeholder-dark": "#a0aec0",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
