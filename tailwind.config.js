/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A5F',
          50: '#E8EDF3',
          100: '#D1DBE7',
          200: '#A3B7CF',
          300: '#7593B7',
          400: '#476F9F',
          500: '#1E3A5F',
          600: '#1A3354',
          700: '#162C49',
          800: '#12253E',
          900: '#0E1E33',
        },
        secondary: {
          DEFAULT: '#FF6B6B',
          50: '#FFECEC',
          100: '#FFD9D9',
          200: '#FFB3B3',
          300: '#FF8D8D',
          400: '#FF6B6B',
          500: '#E05555',
          600: '#C04040',
          700: '#A02B2B',
          800: '#801616',
          900: '#600101',
        },
        accent: {
          DEFAULT: '#2ECC71',
          50: '#E8F8EE',
          100: '#D1F1DD',
          200: '#A3E3BB',
          300: '#75D599',
          400: '#47C777',
          500: '#2ECC71',
          600: '#27AE60',
          700: '#1F8F4D',
          800: '#17703A',
          900: '#0F5027',
        },
        background: '#FAFBFC',
        text: '#2C3E50',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        noto: ['Noto Sans SC', 'sans-serif'],
        mono: ['Source Code Pro', 'monospace'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
