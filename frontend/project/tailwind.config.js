import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: 'var(--color-brand-dark)',
          primary: 'var(--color-brand-primary)',
          light: 'var(--color-brand-light)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
          dark: 'var(--color-accent-dark)',
        },
        surface: 'var(--color-surface)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Sora', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
