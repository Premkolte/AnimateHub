/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'bg-primary-500',
    'text-accent-500',
    'dark:bg-secondary-900',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // body text
        heading: ['Sora', 'sans-serif'], // headings
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          1000: '#100f0fa4',
        },
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e4d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#6c44b6',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundColor: {
        'nav-light': 'rgba(255, 255, 255, 0.3)',
        'nav-dark': 'rgba(88, 28, 135, 0.3)',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0,0,0,0.08)',
        glow: '0 0 15px rgba(59,130,246,0.6)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        gradient: 'gradient 3s ease infinite',
        fadeIn: 'fadeIn 1s ease-in-out',
        slideUp: 'slideUp 0.6s ease-out',
        bounceSlow: 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
}

