module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5D4037',      
        secondary: '#F5F1E6',    
        accent: "#F5F1E6",      
        neutral: "#0F253E"      
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "scale-up": "scaleUp 0.3s ease-out"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        scaleUp: {
          "0%": { transform: "scale(0.75)" },
          "100%": { transform: "scale(1)" }
        }
      }
    },
  },
  plugins: [],
}