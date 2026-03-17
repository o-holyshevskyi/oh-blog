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
        typewriter: {
          '0%': { maxWidth: '0' },
          '100%': { maxWidth: '100%' },
        },
        caret: {
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
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
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
      animation: {
        typewriter: 'typewriter 3.5s steps(40, end) forwards',
        caret: 'blink 1s steps(1) infinite',
        typingDots: 'typingDots 1.5s infinite ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'bounce-down': 'bounceDown 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require('@tailwindcss/typography'),
  ],
}
