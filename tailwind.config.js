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
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4)' },
        },
        glowPurple: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(168, 85, 247, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.4)' },
        },
        rotateIn: {
          '0%': { transform: 'rotate(-10deg) scale(0.9)', opacity: 0 },
          '100%': { transform: 'rotate(0) scale(1)', opacity: 1 },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.1)' },
        },
        morphGradient: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
      },
      animation: {
        gradient: 'gradient 3s ease infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.6s ease-out',
        slideDown: 'slideDown 0.6s ease-out',
        slideLeft: 'slideLeft 0.6s ease-out',
        slideRight: 'slideRight 0.6s ease-out',
        scaleIn: 'scaleIn 0.4s ease-out',
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        glow: 'glow 2s ease-in-out infinite',
        'glow-purple': 'glowPurple 2s ease-in-out infinite',
        rotateIn: 'rotateIn 0.5s ease-out',
        bounceSlow: 'bounce 3s infinite',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        morphGradient: 'morphGradient 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

