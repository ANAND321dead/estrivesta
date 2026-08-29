/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0F',
          surface: '#111118',
          elevated: '#16161F',
        },
        border: {
          DEFAULT: '#1E1E2E',
          bright: '#6C63FF',
        },
        accent: {
          violet: '#6C63FF',
          mint: '#00D4AA',
          danger: '#FF4D6D',
          warning: '#FFB347',
        },
        text: {
          primary: '#F0F0FF',
          secondary: '#8888AA',
          muted: '#555570',
        },
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-3deg)' },
        },
        driftLeft: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(40px, -30px)' },
        },
        driftRight: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-40px, 30px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'drift-left': 'driftLeft 8s ease-in-out infinite',
        'drift-right': 'driftRight 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
