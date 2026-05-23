/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        violet: {
          50:  '#f3f2ff',
          100: '#e9e8ff',
          200: '#d4d2ff',
          400: '#7c7cf0',
          500: '#5b5bd6',
          600: '#4a4abb',
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [],
}
