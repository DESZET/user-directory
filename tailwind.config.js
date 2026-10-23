/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        cream: '#FFFDF5',
        accent: {
          DEFAULT: '#7C3AED',
          light: '#A78BFA',
        },
        strip: {
          1: '#7C3AED',
          2: '#F8E000',
          3: '#FF433D',
          4: '#00A33E',
          5: '#5200FF',
          6: '#FF8C00',
          7: '#0EA5E9',
          8: '#EC4899',
          9: '#14B8A6',
        },
      },
      boxShadow: {
        'brutal': '5px 5px 0 #000',
        'brutal-sm': '4px 4px 0 #000',
        'brutal-lg': '8px 8px 0 #000',
        'brutal-accent': '8px 8px 0 #7C3AED',
        'brutal-modal': '10px 10px 0 #7C3AED',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'slide-up': 'slideUp 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fadeIn 0.2s ease-out',
        'card-in': 'cardIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) backwards',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        cardIn: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
