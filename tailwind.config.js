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
          '0%': { maxWidth: '0' },  /* Start with 0 width */
          '100%': { maxWidth: '100%' }, /* Expand fully */
        },
        caret: {
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        typingDots: {
          '0%, 80%, 100%': { opacity: 0 },
          '40%': { opacity: 1 },
        },
      },
      animation: {
        typewriter: 'typewriter 3.5s steps(40, end) forwards',
        caret: 'blink 1s steps(1) infinite',
        typingDots: 'typingDots 1.5s infinite ease-in-out',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require('@tailwindcss/typography'),
  ],
}
