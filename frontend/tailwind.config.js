/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        brand: {
          navy: 'var(--brand-navy, #060B19)',
          'navy-light': 'var(--brand-navy-light, #0F172A)',
          electric: 'var(--brand-electric, #0066FF)',
          orange: 'var(--brand-orange, #FF7A00)',
          heading: 'var(--brand-heading, #FFFFFF)',
          text: 'var(--brand-text, #F8FAFC)',
          muted: 'var(--brand-muted, #8E9BAE)',
          subtle: 'var(--brand-subtle, #64748B)',
          white: '#FFFFFF',
        },
        card: {
          bg: 'var(--card-bg, rgba(15, 23, 42, 0.75))',
          surface: 'var(--card-surface, #0F172A)',
          border: 'var(--card-border, rgba(255, 255, 255, 0.08))',
        },
        pill: {
          bg: 'var(--pill-bg, rgba(255, 255, 255, 0.07))',
          text: 'var(--pill-text, #F1F5F9)',
          border: 'var(--pill-border, rgba(255, 255, 255, 0.12))',
        },
        cinema: {
          bg: 'var(--cinema-bg, var(--brand-navy, #060B19))',
          surface: 'var(--cinema-surface, var(--brand-navy-light, #0F172A))',
          accent: 'var(--cinema-accent, var(--brand-electric, #0066FF))',
          rim: 'var(--cinema-rim, var(--brand-orange, #FF7A00))',
          text: 'var(--cinema-text, var(--brand-text, #f8fafc))',
          muted: 'var(--cinema-muted, var(--brand-muted, #94a3b8))',
        },
      },
      animation: {
        blob: "blob 7s infinite",
        "spin-slow": "spin 8s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "film-roll": "film-roll 25s linear infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      backgroundImage: {
        'cinema-gradient': 'linear-gradient(135deg, #030712 0%, #0f1729 50%, #030712 100%)',
        'cinema-radial': 'radial-gradient(ellipse at center, rgba(239,68,68,0.08) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}