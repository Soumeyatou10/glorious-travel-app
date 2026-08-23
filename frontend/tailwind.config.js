/** Palette calquee sur l'identite visuelle Glorious Travel (bleu / rouge / or) */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gt-blue-deep': '#0A4DA0',
        'gt-blue': '#1476E0',
        'gt-blue-bright': '#3A9BFF',
        'gt-navy': '#052447',
        'gt-red': '#D62828',
        'gt-red-deep': '#A31D1D',
        'gt-gold': '#FFDD57',
        'gt-green': '#1E9E5A',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'gt-card': '0 20px 50px -28px rgba(10,77,160,0.35)',
      }
    },
  },
  plugins: [],
}
