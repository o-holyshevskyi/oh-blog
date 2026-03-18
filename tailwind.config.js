import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        cream: '#faf9f5',
        ink: '#141413',
        warmgray: '#e8e6dc',
        midgray: '#b0aea5',
        sage: '#788c5d',
        mutedblue: '#6a9bcc',
        terracotta: '#d97757',
        warmtan: '#D4A574',
      },
      fontFamily: {
        serif: ['Georgia', 'ui-serif', 'Cambria', '"Palatino Linotype"', '"Times New Roman"', 'Times', 'serif'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-pre-code': theme('colors.pink[100]'),
            '--tw-prose-pre-bg': theme('colors.blue[900]'),
            '--tw-prose-invert-pre-code': theme('colors.pink[300]'),
            '--tw-prose-invert-pre-bg': theme('colors.blue[900]'),
          },
        },
      }),
      keyframes: {
        typingDots: {
          '0%, 80%, 100%': { opacity: 0 },
          '40%': { opacity: 1 },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      animation: {
        typingDots: 'typingDots 1.5s infinite ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'bounce-down': 'bounceDown 1.5s ease-in-out infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#faf9f5',
            foreground: '#141413',
            primary: {
              50: '#fef6f0',
              100: '#fde8d8',
              200: '#fbd0b0',
              300: '#f5b07a',
              400: '#e8945f',
              500: '#d97757',
              600: '#c4623f',
              700: '#a34d33',
              800: '#853f2e',
              900: '#6d3628',
              DEFAULT: '#d97757',
              foreground: '#ffffff',
            },
          },
        },
        dark: {
          colors: {
            background: '#1a1918',
            foreground: '#faf9f5',
            primary: {
              50: '#fef6f0',
              100: '#fde8d8',
              200: '#fbd0b0',
              300: '#f5b07a',
              400: '#e8945f',
              500: '#d97757',
              600: '#c4623f',
              700: '#a34d33',
              800: '#853f2e',
              900: '#6d3628',
              DEFAULT: '#d97757',
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
    require('@tailwindcss/typography'),
  ],
}
