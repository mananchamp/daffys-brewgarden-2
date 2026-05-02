/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          bright: '#f0c060',
          dim: '#8a6f2e',
        },
        emerald: {
          deep: '#0d2b1e',
          DEFAULT: '#1a4a30',
          light: '#2a6b45',
        },
        amber: {
          glow: '#d4692a',
        },
        void: '#050505',
        smoke: 'rgba(255,255,255,0.04)',
        glass: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'grain': 'grain 0.5s steps(1) infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 1%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(2%, -2%)' },
          '50%': { transform: 'translate(-3%, 2%)' },
          '60%': { transform: 'translate(1%, -4%)' },
          '70%': { transform: 'translate(-2%, 3%)' },
          '80%': { transform: 'translate(3%, 1%)' },
          '90%': { transform: 'translate(-1%, -2%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.3), 0 0 40px rgba(201, 168, 76, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 168, 76, 0.6), 0 0 80px rgba(201, 168, 76, 0.25)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
