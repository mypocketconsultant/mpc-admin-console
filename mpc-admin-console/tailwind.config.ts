import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4efff',
          100: '#e9ddff',
          500: '#5b3df5',
          600: '#4c30dd',
          700: '#3f28ba',
        },
        ink: '#0f172a',
        muted: '#64748b',
        panel: '#ffffff',
        page: '#f7f8fc',
        line: '#e7eaf3',
        success: '#16a34a',
        danger: '#dc2626',
        warning: '#ca8a04'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(17, 24, 39, 0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      }
    },
  },
  plugins: [],
} satisfies Config;
