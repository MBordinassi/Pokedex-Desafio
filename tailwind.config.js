/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f1',
          100: '#ffdddd',
          200: '#ffc2c2',
          300: '#ff9a9a',
          400: '#ff6565',
          500: '#FF5350', // Primary Pokémon red
          600: '#e82a2a',
          700: '#c41c1c',
          800: '#a11a1a',
          900: '#841b1b',
        },
        secondary: {
          50: '#eef3ff',
          100: '#dfe7ff',
          200: '#c6d3ff',
          300: '#a4b8ff',
          400: '#7e93fb',
          500: '#3B4CCA', // Secondary Pokémon blue
          600: '#3443b4',
          700: '#2b3694',
          800: '#252e7a',
          900: '#222a65',
        },
        accent: {
          50: '#fefee8',
          100: '#fefdc2',
          200: '#fefa8c',
          300: '#fff44d',
          400: '#ffea1f',
          500: '#FFDE00', // Accent Pokémon yellow
          600: '#d4ac00',
          700: '#a07e02',
          800: '#85670c',
          900: '#715711',
        },
        success: {
          50: '#eefdf2',
          100: '#d6fbe1',
          200: '#b0f5c6',
          300: '#7eeaa4',
          400: '#4ed67b',
          500: '#2eb85b',
          600: '#229247',
          700: '#1d733a',
          800: '#1b5b30',
          900: '#184b2a',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
};