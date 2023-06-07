/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#746ED4',
        secondary: '#E82BB4',
        tertiary: '#7BE4DF',
        black: '#0C0C19',
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: '#746ED4',
          secondary: '#E82BB4',
          accent: '#7BE4DF',
          neutral: '#0C0C19',
          'base-100': '#ffffff',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
          '--rounded-btn': '4px',
          '--rounded-box': '4px',
          '--tab-radius': '0',
        },
      },
    ],
  },
};
