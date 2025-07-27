/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",
        secondary: "#6366F1",
        accent: "#EC4899",
        surface: "#1E1B2E",
        background: "#0F0E17",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6"
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
        'gradient-accent': 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
        'gradient-surface': 'linear-gradient(135deg, #1E1B2E 0%, #2A2542 100%)',
      }
    },
  },
  plugins: [],
}