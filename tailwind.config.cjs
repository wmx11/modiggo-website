/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        tertiary: 'hsl(var(--tertiary))',
        black: 'hsl(var(--black))',
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          accent: 'var(--tertiary)',
          neutral: 'var(--black)',
          'base-100': '#ffffff',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
          '--rounded-btn': 'var(--border-radius)',
          '--rounded-box': 'var(--border-radius)',
          '--tab-radius': '0',
          '--p': 'var(--primary)',
          '--s': 'var(--secondary)',
          '--a': 'var(--tertiary)',
          '--n': 'var(--black)',
          '.tab-active': {
            'background-color': 'hsl(var(--black)) !important',
          },
        },
      },
    ],
  },
};
