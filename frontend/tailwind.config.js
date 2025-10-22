/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1e3a5f',
        'accent': '#3b82f6',
        'secondary': '#64748b',
        'background': '#f8fafc',
        'card': '#ffffff',
        'success': '#10b981',
        'text-primary': '#1e3a5f',
        'text-secondary': '#64748b',
        'light-blue': '#dbeafe',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}