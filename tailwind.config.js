/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // We're using class strategy since we're forcing dark mode
  theme: {
    extend: {
      colors: {
        // Custom purple shades to match our design
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // Custom gray shades for our dark theme
        gray: {
          750: '#2d3748', // Additional gray shade between 700 and 800
          850: '#1a202c', // Additional gray shade between 800 and 900
          950: '#0d1117', // Deeper dark for certain backgrounds
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.gray.300'),
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
            a: {
              color: theme('colors.purple.400'),
              '&:hover': {
                color: theme('colors.purple.300'),
              },
            },
            code: {
              color: theme('colors.gray.300'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    // Plugins can be added here if needed in the future
  ],
}

