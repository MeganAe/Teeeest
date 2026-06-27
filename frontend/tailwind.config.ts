import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        medical: { primary: '#0EA5E9', secondary: '#6366F1', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' },
      },
      backdropBlur: { xs: '2px', sm: '4px', md: '8px', lg: '12px', xl: '20px' },
    },
  },
  plugins: [],
}
export default config
