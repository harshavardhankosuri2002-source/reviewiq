/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // OHAMA Light Palette
        canvas: {
          DEFAULT: '#F5F8FC',
          subtle: '#EDF3F9',
          card: '#FFFFFF',
        },
        navy: {
          900: '#0F1D2E',
          800: '#182C45', // Primary Midnight Navy
          700: '#233E60',
          600: '#325682',
        },
        iceberg: {
          50: '#F0F7FF',
          100: '#EAF5FF', // Iceberg Blue
          200: '#D5E9FA', // Sky Blue
          300: '#B8DBF7',
          400: '#8CBCE5', // Glacier Blue
          500: '#38BDF8',
          600: '#0284C7',
          700: '#0369A1',
          DEFAULT: '#0284C7',
          glow: 'rgba(56, 189, 248, 0.25)',
          tint: 'rgba(234, 245, 255, 0.8)',
        },
        glacier: {
          DEFAULT: '#8CBCE5',
          light: '#D5E9FA',
          dark: '#0284C7',
          deep: '#182C45',
        },
        feedback: {
          positive: '#059669',
          'positive-bg': '#ECFDF5',
          'positive-border': '#A7F3D0',
          mixed: '#D97706',
          'mixed-bg': '#FFFBEB',
          'mixed-border': '#FDE68A',
          negative: '#DC2626',
          'negative-bg': '#FEF2F2',
          'negative-border': '#FECACA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(24, 44, 69, 0.04), 0 1px 3px rgba(24, 44, 69, 0.02)',
        'card': '0 4px 20px -2px rgba(24, 44, 69, 0.06), 0 2px 6px -1px rgba(24, 44, 69, 0.04)',
        'card-hover': '0 12px 32px -4px rgba(24, 44, 69, 0.12), 0 4px 12px -2px rgba(24, 44, 69, 0.06)',
        'glow-iceberg': '0 0 25px -5px rgba(2, 132, 199, 0.25)',
        'phone-3d': '0 25px 50px -12px rgba(24, 44, 69, 0.25), 0 0 0 1px rgba(140, 188, 229, 0.3)',
        'phone-floating': '0 30px 60px -15px rgba(24, 44, 69, 0.2), 0 10px 20px -5px rgba(24, 44, 69, 0.1)',
      }
    },
  },
  plugins: [],
}
