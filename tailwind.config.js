/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aqui a gente pode deixar as cores da Falkon registradas se quiser
        falkonGold: '#f59e0b',
        falkonSilver: '#94a3b8',
      },
    },
  },
  plugins: [],
}
