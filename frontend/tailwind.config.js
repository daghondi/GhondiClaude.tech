/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Color system based on the PRD
      colors: {
        // Core dark theme colors
        dark: {
          primary: '#1E1E1E',
          secondary: '#121212',
          tertiary: '#2A2A2A',
          quaternary: '#3A3A3A',
        },
        // Accent colors
        accent: {
          blue: '#1E90FF',    // Neon blue
          magenta: '#FF00FF', // Magenta
          gold: '#FFD700',    // Gold
          indigo: '#4B0082',  // Indigo
        },
        // Semantic colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#1E90FF',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        gray: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
      // Typography system
      fontFamily: {
        // Headings: System fonts for now (to avoid Google Fonts timeout)
        heading: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        // Body text options - using system fonts
        playfair: ['Georgia', 'serif'],
        lora: ['Georgia', 'serif'],
        raleway: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        // Default sans and serif
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'monospace'],
      },
      // Spacing system
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      // Animation system
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'typewriter': 'typewriter 2s steps(20) forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #1E90FF, 0 0 10px #1E90FF, 0 0 15px #1E90FF',
          },
          '100%': { 
            boxShadow: '0 0 10px #1E90FF, 0 0 20px #1E90FF, 0 0 30px #1E90FF',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      // Layout and sizing
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
      // Backdrop effects
      backdropBlur: {
        xs: '2px',
      },
      // Aspect ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      // Screen breakpoints
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    // Custom plugin for utilities
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        },
        '.text-shadow-lg': {
          textShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-xl': {
          textShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
        },
        '.neon-glow': {
          boxShadow: `0 0 5px ${theme('colors.accent.blue')}, 0 0 10px ${theme('colors.accent.blue')}, 0 0 15px ${theme('colors.accent.blue')}`,
        },
        '.neon-glow-magenta': {
          boxShadow: `0 0 5px ${theme('colors.accent.magenta')}, 0 0 10px ${theme('colors.accent.magenta')}, 0 0 15px ${theme('colors.accent.magenta')}`,
        },
        '.neon-glow-gold': {
          boxShadow: `0 0 5px ${theme('colors.accent.gold')}, 0 0 10px ${theme('colors.accent.gold')}, 0 0 15px ${theme('colors.accent.gold')}`,
        },
        '.animation-delay-0': {
          animationDelay: '0s',
        },
        '.animation-delay-200': {
          animationDelay: '0.2s',
        },
        '.animation-delay-400': {
          animationDelay: '0.4s',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
