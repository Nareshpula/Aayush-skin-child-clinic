/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.125rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      spacing: {
        '18': '4.5rem',
        '68': '17rem',
        '84': '21rem',
        '98': '24.5rem',
      },
      transform: {
        'gpu': 'translate3d(0, 0, 0)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0,0,0,0.1)'
        },
        '.text-shadow-lg': {
          'text-shadow': '0 4px 8px rgba(0,0,0,0.12)'
        },
      })
    },
    function({ addComponents }) {
      addComponents({
        '.btn': {
          '@apply inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200': {},
          '&:hover': {
            '@apply transform -translate-y-0.5': {}
          },
          '&:active': {
            '@apply transform translate-y-0': {}
          }
        },
        '.btn-primary': {
          '@apply bg-primary-600 text-white hover:bg-primary-700': {},
        },
        '.btn-secondary': {
          '@apply bg-secondary-600 text-white hover:bg-secondary-700': {},
        },
      })
    },
  ],
};
