/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        primary: {
          50:  '#eef3ff',
          100: '#dde6ff',
          200: '#c2d0ff',
          300: '#9db0ff',
          400: '#7a8aff',
          500: '#5c66f5',
          600: '#1a2980',  // main brand blue
          700: '#1a237e',
          800: '#151b6e',
          900: '#0f1354',
          950: '#070a2a',
        },
        gold: {
          50:  '#fffceb',
          100: '#fff5c3',
          200: '#ffea81',
          300: '#ffd83e',
          400: '#ffc61a',  // main gold accent
          500: '#f5a200',
          600: '#d97e00',
          700: '#b55900',
          800: '#924500',
          900: '#783800',
          950: '#451d00',
        },
        surface: {
          light: '#f8f9ff',
          dark: '#0a0d1a',
        }
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cejec-gradient': 'linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(26, 41, 128, 0.08)',
        'card-hover': '0 12px 40px rgba(26, 41, 128, 0.16)',
        'gold': '0 4px 24px rgba(255, 198, 26, 0.3)',
      },
    },
  },
  plugins: [],
}
